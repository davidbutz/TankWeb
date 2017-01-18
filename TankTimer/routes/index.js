/*
 * GET home page.
 */

var https = require('https')

exports.index = function (req, res) {
    var items = [];
    for (var i = 0; i < 1000; i++) {
        items.push({ nick: 'nick' + i, date: new Date(), args: ['zero', 'one'] });
    }
    res.render('index', {
        channel: 'Express',
        buffer: items
    });
};

exports.about = function (req, res) {
    res.render('about', {
        channel: 'Express'
    });
};

exports.why = function (req, res) {
    res.render('why', {
        channel: 'Express'
    });
};

exports.privacy = function (req, res) {
    res.render('privacy', {
        channel: 'Express'
    });
};

exports.products = function (req, res) {
    res.render('products', {
        channel: 'Express'
    });
};

exports.contact = function (req, res) {
    res.render('contact', {
        channel: 'Express'
    });
};

exports.features = function (req, res) {
    res.render('features', {
        channel: 'Express'
    });
};

exports.shopping = function (req, res) {
    res.render('shopping', {
        channel: 'Express'
    });
};


exports.facebook = function (req, res) {
    res.render('facebook', {
        channel: 'Express'
    });
};

exports.specs = function (req, res) {
    res.render('specs', {
        channel: 'Express'
    });
};

exports.howitworks = function (req, res) {
    res.render('howitworks', {
        channel: 'Express'
    });
};
