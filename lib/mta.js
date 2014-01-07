'use strict';

var utils = require('./utils');
var request = require('request');
var parseString = require('xml2js').parseString;

var MTA = function(options) {
  if (!(this instanceof MTA)) return new MTA(options);

  var defaults = {
    base_endpoint: 'http://web.mta.info',
    service_status_endpoint: '/status/serviceStatus.txt',
  };

  this.options = utils.merge(defaults, options);
};

MTA.prototype.status = function(params, callback) {

  var url = this.options.base_endpoint + this.options.service_status_endpoint;

  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  request(url, function (err, res, xml) {

    if (err) {
      callback(err);
    }

    if (res.statusCode != 200) {
      callback(new Error("Error: HTTP Status code " + res.statusCode));
    }

    parseString(xml, function (err, status) {

      if (err) {
        callback(err);
      }

      callback(null, status);

    });

  });
};

module.exports = MTA;
