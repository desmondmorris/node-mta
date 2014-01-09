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

MTA.prototype.status = function(service, callback) {

  var url = this.options.base_endpoint + this.options.service_status_endpoint;

  if (typeof service === 'function') {
    callback = service;
    service = null;
  }
  else if (typeof service === 'string') {
    service = {
      service: service
    }
  }

  request(url, function (err, res, xml) {

    if (err) {
      callback(err);
      return;
    }

    if (res.statusCode != 200) {
      callback(new Error("Error: HTTP Status code " + res.statusCode));
    }

    parseString(xml, function (err, data) {

      data = utils.arrayClean(data);

      if (err) {
        callback(err);
        return;
      }

      var ret = {};

      ret = {
        subway: data.service.subway,
        bus: data.service.bus,
        BT: data.service.BT,
        LIRR: data.service.LIRR,
        MetroNorth: data.service.MetroNorth
      };

      if (service !== null) {
        if ((service.hasOwnProperty('service')) && ret.hasOwnProperty(service.service)) {
          ret = ret[service.service].line;
        }
      }

      callback(null, ret);

    });

  });
}

module.exports = MTA;
