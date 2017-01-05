var req = "";
var res = "";

//var gcloud = require('gcloud')({
//    projectId: 'boataware2',
//    keyFilename: './config/BoatAware2-dcbca66e922c.json'
//});

var config = require('./config/index.js');

var settings = {
    config: config
};

var datalayer = require("./datalayer/DataLayer");

datalayer.addPairingRequest(req, res, "hi", "there", function (err, moduleID) {
    //console.log(moduleID);
});

var buf = new Buffer(12);
var bufmodule = new Buffer(2);

const arr = new Uint16Array(1);
var moduleID = 16579;
arr[0] = moduleID;
buf.writeUInt16BE(moduleID, 0);
bufmodule.writeUInt16BE(moduleID, 0);
console.log(bufmodule.readUInt16BE(0));
//console.log(module.toString(2));
//const modulebug = Buffer.from(arr.buffer);
//console.log(modulebug);
console.log("--");
console.log(bufmodule.toString('hex'));
console.log(bufmodule.toString('hex')); 
console.log("--");
console.log("%02x", arr[0]);

var offset = 2;
var pos = 0;
var fromBarCodeScanner = "0e34f4e67a7b3435";
var hexBuffer = [];
for (var i = 0; i <= fromBarCodeScanner.length; i += 2) {
    // take char[n]+char[n+1] and read that into a buffer "as hex"
    var byteBuffer = new Buffer(fromBarCodeScanner[i] + fromBarCodeScanner[i + 1], 'hex')[0];

    // now you have 2 HEX chars = 1 byte
    console.log(byteBuffer); // this will print as a number, I think
    //hexBuffer.push(byte);
    buf.writeUInt8(byteBuffer, 2+pos++);

    //if (i > 0 && i % 2 == 0) {
    //    var hexString = hexBuffer[0] + hexBuffer[1];
    //    console.log(hexString);
    //    var bytestring = Number('0x' + hexString).toString(10); 
    //    console.log(bytestring);
    //    buf.writeUInt8(bytestring, offset);
    //    parseInt(bytestring, 2).toString(16);  // '80'
    //    hexBuffer = [];
    //    offset++;
    //}
    //hexBuffer.push(fromBarCodeScanner[i]);
}
console.log(buf);

//console.log(myBuffer);

//var db = require('node-mysql');

//var mysql = require('mysql');
//var connection = mysql.createConnection(config().mysql);

//connection.connect();
//var inputone = "hi2";
//var inputtwo = "there2";
//connection.query('Call addPairingRequest(?,?)' ,[inputone,inputtwo], function (err, rows, fields) {
//    if (err) throw err;
    
//    console.log('The result is: ', rows[0][0].ModulePairID);
//    console.log(rows[0][0].ModulePairID);
//    //console.log(fields);
//});

//connection.end();