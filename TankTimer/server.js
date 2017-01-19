'use strict';

var path = require('path');
var express = require('express');
var routes = require('./routes');
var session = require('cookie-session');
var config = require('./config');
//var logging = require('./lib/logging')();

var app = express();

app.disable('etag');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');
app.set('trust proxy', true);


// Add the request logger before anything else so that it can
// accurately log requests.
//app.use(logging.requestLogger);


// Configure the session and session storage.
// MemoryStore isn't viable in a multi-server configuration, so we
// use encrypted cookies. Redis or Memcache is a great option for
// more secure sessions, if desired.
app.use(session({
    secret: config.secret,
    signed: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/privacy', routes.privacy);
app.get('/features', routes.features);
app.get('/facebook', routes.facebook);
app.get('/specs', routes.specs);
app.get('/howitworks', routes.howitworks);
app.get('/contact', routes.contact);
app.get('/shopping', routes.shopping);
app.use('/api', require('./routes/api')());

// Our application will need to respond to health checks when running on
// Compute Engine with Managed Instance Groups.
app.get('/_ah/health', function (req, res) {
    res.status(200).send('ok');
});


// Add the error logger after all middleware and routes so that
// it can log errors from the whole application. Any custom error
// handlers should go after this.
//app.use(logging.errorLogger);


// Basic error handler
app.use(function (err, req, res, next) {
    /* jshint unused:false */
    res.status(500).send('Something broke!');
});





// Start the server
var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});


module.exports = app;