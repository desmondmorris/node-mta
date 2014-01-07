'use strict';

var MTA = require('../lib/mta');
var should = require('should');
var nock = require('nock');
var fs = require('fs');


describe('service status', function(){
  it('should return json array of service status"', function(done){

    var mta = new MTA();
    var data = fs.readFileSync(__dirname + '/mock.xml');

    var scope = nock(mta.options.base_endpoint)
      .get(mta.options.service_status_endpoint)
      .reply(200, data);

    mta.status(function(err, status){
      (err == null).should.be.true;
      status.should.have.property('service');
      done();
    });
  })
})

