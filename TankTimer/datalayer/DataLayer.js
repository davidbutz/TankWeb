(function (DataLayer) {
    var mysql = require('mysql');
    var config = require('../config/index.js');
    var settings = {
        config: config
    };
    var connection = initializeConnection(config().mysql);
    DataLayer.addPairingRequest = function (req, res, macAddress, deviceID, callback){
        connection.query('Call addPairingRequest(?,?)' , [macAddress, deviceID], function (err, rows, fields) {
            if (err) throw err;
            
            //console.log('The result is: ', rows[0][0].ModulePairID);
            callback(null,rows[0][0].ModulePairID);
        });
    }
    
    DataLayer.confirmPairingRequest = function (req, res, moduleID, callback) {
        connection.query('Call confirmPairingRequest(?)' , [moduleID,], function (err, rows, fields) {
            if (err) {
                throw err;
                callback(err, "failure");
            }
            else {
                callback(null, "success");
            }
        });
    }
    
    
    DataLayer.handleSensorData = function (req, res, incomingData, callback) {
        //parse out the message as a sensor reading.
        //What's important to me is the ModuleID, the 
        const buf = new Buffer(incomingData, 'hex');
        //const buf = Buffer.from(incomingData);
        var moduleID = buf.readUInt16LE(0);
        console.log(moduleID);
        var capabilityID = buf.readUInt16LE(2);
        console.log(capabilityID);
        var value = buf.readUInt32LE(4);
        connection.query('Call handleSensorData(?,?,?)' , [moduleID,capabilityID,value], function (err, rows, fields) {
            if (err) {
                throw err;
                callback(err, "failure");
            }
            else {
                callback(null, "success");
            }
        });
    }

    function initializeConnection(config) {
        function addDisconnectHandler(connection) {
            connection.on("error", function (error) {
                if (error instanceof Error) {
                    if (error.code === "PROTOCOL_CONNECTION_LOST") {
                        console.error(error.stack);
                        console.log("Lost connection. Reconnecting...");
                        
                        initializeConnection(connection.config);
                    } else if (error.fatal) {2
                        throw error;
                    }
                }
            });
        }
        
        var connection = mysql.createConnection(config);
        
        // Add handlers.
        addDisconnectHandler(connection);
        
        connection.connect();
        return connection;
    }

})(module.exports);
    