'use strict';

var MTA = require('../lib/mta');
var should = require('should');
var nock = require('nock');
var fs = require('fs');


var mta = new MTA();
var data = fs.readFileSync(__dirname + '/mock.xml', 'utf8');

var scope = nock(mta.options.base_endpoint)
  .get(mta.options.service_status_endpoint)
  .reply(200, data);

describe('service status', function(){
  it('should return json array of service status"', function(done){
    mta.status(function(err, status){
      (err == null).should.be.true;
      status.should.have.property('subway');
      status.should.have.property('bus');
      status.should.have.property('BT');
      status.should.have.property('LIRR');
      status.should.have.property('MetroNorth');
      done();
    });
  });

  it('should return json array of service lines"', function(done){
    mta.status({service: 'bus'}, function(err, status){
      (err == null).should.be.true;
      status[0].should.have.property('name');
      done();
    });
  });
});

