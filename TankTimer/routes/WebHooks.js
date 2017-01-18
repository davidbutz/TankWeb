module.exports = function (app, settings) {
    
    //var League = require('../models/League.js');
    //var Login = require('../models/Login.js');
    
    var url = require('url'), 
        express = require('express'), 
        rRouter = express.Router();
    
    //var authentication = require("../controllers/Authentication");
    //var setlineupcontroller = require("../controllers/SetLineupController");
    var datalayer = require("../datalayer/DataLayer");

    var debugging = true;
    
    rRouter.use(function (req, res, next) {
        // do logging that any /api call got made 
        if (debugging) {
            console.log('Something is happening in /api/webhooks layer.');
        }
        next();
    });
    

    rRouter.get("/sendPairingRequest/:loginToken/:macAddress", function (req, res) {

        //logintToken will eventually drive to a deviceID
        //for now , I am hard-coding this.
        var deviceIDstr = "2a003e000247343339373536";
        var macAddress = req.params.macAddress;

        //add this new module to the MySQL database,
        //store deviceID, macAddress and get back either a new ID, or an existing ID (if done > 1) - call it moduleID
        datalayer.addPairingRequest(req, res, deviceIDstr, macAddress, function (err, moduleID) {
            if (err) {
                res.json({ "error": err });
            }
            console.log(moduleID);
            //take the moduleID and macAddress and put it into a byte array. this will become the 'argument' for the function 'claimModule'
            var bufmodule = new Buffer(2);
            const arr = new Uint16Array(1);
            arr[0] = moduleID;
            bufmodule.writeUInt16BE(moduleID, 0);

            var argumentString = bufmodule.toString('hex') + macAddress;

            //login to particle, call the function
            var Particle = require('particle-api-js');
            var particle = new Particle();
            particle.login({ username: settings.config().Particle.username, password: settings.config().Particle.password }).then(function (data) {
                var fnPr = particle.callFunction({ deviceId: deviceIDstr, name: 'claimModule', 'argument': argumentString, auth: data.body.access_token });
                fnPr.then(
                    function (data) {
                        console.log("function called success", data);
                        sendresponse(res, { success: true, message: 'claimModule received' });
                    },
				function (err) {
                        console.log(err);
                        sendresponse(res, { success: false, message: 'claimModule received' });
                    }
                )
            });
        });
    });
    
    //command to turn on/off LED light.
    rRouter.get("/command/:deviceID/:variable", function (req, res) {
        var deviceIDstr = req.params.deviceID;
        console.log(deviceIDstr);
        var variable = req.params.variable;
        var Particle = require('particle-api-js');
        var particle = new Particle();
        particle.login({ username: settings.config().Particle.username, password: settings.config().Particle.password }).then(function (data) {
            console.log(data.body.access_token);
            console.log("------");
            console.log(deviceIDstr);
            console.log("------");
            var fnPr = particle.callFunction({ deviceId: deviceIDstr, name: 'led', 'argument': variable, auth: data.body.access_token });
            fnPr.then(
                function (data) {
                    console.log("function called success", data);
                },
				function (err) {
                    console.log(err);
                }
            )
        });
        sendresponse(res, { success: true, message: 'temp received' });
    });
    

    rRouter.post("/temp", function (req, res) {
        console.log(req.body);
        sendresponse(res, { success: true, message: 'temp received' });
    });
    
    rRouter.post("/claimACK", function (req, res) {
        //make sure webhook in particle sends meta-data so that "data" is exposed. otherwise it's "field1" or whatever you call it.
        var moduleID = req.body.data;
        if (req.body.data == "test-event") {
            sendresponse(res, { success: false, message: 'Something Happened' });
        }
        else {
            datalayer.confirmPairingRequest(req, res, moduleID, function (err, message) {
                if (err) {
                    sendresponse(res, { success: false, message: 'Something Happened' });
                }
                else {
                    sendresponse(res, { success: true, message: 'Acknowledgement Received' });
                }
            });
        }
    });
    
    rRouter.post("/handleData", function (req, res) {
        var incomingData = req.body.data;
        if (req.body.data == "test-event") {
            sendresponse(res, { success: false, message: 'Something Happened' });
        }
        else {
            datalayer.handleSensorData(req, res, incomingData, function (err, message) {
                if (err) {
                    sendresponse(res, { success: false, message: 'Something Happened' });
                }
                else {
                    sendresponse(res, { success: true, message: 'Acknowledgement Received' });
                }
            });
        }
    });

    //generic send reponse.
    function sendresponse(res, response) {
        res.json(response);
    }
    
    app.use('/api/webhooks', rRouter);
}; 