
var http = require('http');

var port = 81;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config/index.js');

var controllers = require("./controllers");

var settings = {
    config: config
};

// Web layer configuration.

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "vash");
controllers.init(app);

// Below is a command that allows public exposure to items.
app.use(express.static(__dirname + "/public"));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
routes = require('./routes')(app, settings);
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('App listening at http://%s:%s', host, port);
});

