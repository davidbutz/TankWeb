// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
//var mcapi = require('../node_modules/mailchimp-api/mailchimp');

module.exports = function(){

  var router = express.Router();

  router.use(bodyParser.urlencoded());


  function handleRpcError(err, res) {
    if (err.code === 404) { return res.status(404); }
    res.status(500).json({
      message: err.message,
      internalCode: err.code
    });
  }

    router.post('/contact', function (req, res) {
        
        //REQUIRED to communicate with AWS.
        var AWS = require('aws-sdk-promise');
        var cloudconfig = require('../cloud/index.js');
        var cloudsettings = {
            cloudconfig: cloudconfig
        };
        var profile = cloudsettings.cloudconfig().cloud_aws;
        AWS.config.update(profile);
        var message = "a new contact request from boataware.com<br>";
        if (req.body.email) {
            message += req.body.email + "<br>";
        }
        if (req.body.name) {
            message += req.body.name + "<br>";
        }
        if (req.body.subject) {
            message += req.body.subject + "<br>";
        }
        if (req.body.message) {
            message += req.body.message + "<br>";
        }
        var ses = new AWS.SES({ apiVersion: '2010-12-01' });
        var to = ["info@boataware.com"];
        var subject = "Contact Request from BoatAware.com";
        var from = cloudsettings.cloudconfig().boatawareemail;
        var messagebody = message;
        var params = {
            Destination: { ToAddresses: to },
            Source: from,
            Message: {
                Body: {
                    Html: {
                        Data: messagebody
                    },
                    Text: {
                        Data: 'message text'
                    }
                },
                Subject: {
                    Data: subject
                }
            }
        }
        
        ses.sendEmail(params, function (err, data) {
            if (err) {
                console.log(err);
                res.json({ 'status': 'success', 'msg': 'Please check your email & confirm!' });
            }
            if (data.MessageId) {
                res.json({ 'status': 'success', 'msg': 'Please check your email & confirm!' });
            }
            else {
                if (debugging) {
                    console.log(data);
                }
                res.json({ 'status': 'success', 'msg': 'Please check your email & confirm!' });
            }
        });
    });

    router.post('/subscribe', function (req, res) {
        
        res.json({ 'status': 'success', 'msg': 'Please check your email & confirm!' });


    });

  return router;

};
