(function (DataLayer) {
    var mysql = require('mysql');
    var config = require('../config/index.js');
    var settings = {
        config: config
    };
    var connection = initializeConnection(config().mysql);
    DataLayer.addPairingRequest = function (req, res, macAddress, deviceID, callback){
        //connection.connect();
        connection.query('Call addPairingRequest(?,?)' , [macAddress, deviceID], function (err, rows, fields) {
            if (err) throw err;
            
            //console.log('The result is: ', rows[0][0].ModulePairID);
            callback(null,rows[0][0].ModulePairID);
        });
        //connection.end();
    }
    
    DataLayer.confirmPairingRequest = function (req, res, moduleID, callback) {
        //connection.connect();
        connection.query('Call confirmPairingRequest(?)' , [moduleID,], function (err, rows, fields) {
            if (err) throw err;
            callback(null, "success");
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
                    } else if (error.fatal) {
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
    