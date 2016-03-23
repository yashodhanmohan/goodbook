'use strict';

var app = require('../..');
import request from 'supertest';

var newOrganizationOrganizationRequest;

describe('OrganizationOrganizationRequest API:', function() {

  describe('GET /api/v1/organizationOrganizationRequests', function() {
    var organizationOrganizationRequests;
    beforeEach(function(done) {
      request(app)
        .get('/api/v1/organizationOrganizationRequests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          organizationOrganizationRequests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      organizationOrganizationRequests.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/v1/organizationOrganizationRequests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/organizationOrganizationRequests')
        .send({
    		"org1Id": "123",
    		"org2Id": "456",
            "donation": true,
            status: 9,
            quote:45,
    		"thread": [
                {
                    
                    orgId: "1",
                    message: "Test Message From Org 1"
                },
                {
                    orgId: "2",
                    message: "Test Message From Org"
                }
            ]
    	})
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newOrganizationOrganizationRequest = res.body;
          done();
        });
    });

    it('should respond with the newly created organizationOrganizationRequest', function() {
        newOrganizationOrganizationRequest.org1Id.should.equal("123");
        newOrganizationOrganizationRequest.org2Id.should.equal("456");
        newOrganizationOrganizationRequest.donation.should.equal(true);
        newOrganizationOrganizationRequest.status.should.equal(9);
        newOrganizationOrganizationRequest.quote.should.equal(45);
        newOrganizationOrganizationRequest.thread.should.have.length(2);
    });

  });

  describe('GET /api/v1/organizationOrganizationRequests/:id', function() {
    var organizationOrganizationRequest;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/organizationOrganizationRequests/' + newOrganizationOrganizationRequest._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          organizationOrganizationRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      organizationOrganizationRequest = {};
    });

    it('should respond with the requested OrganizationOrganizationRequest', function() {
        organizationOrganizationRequest.org1Id.should.equal("123");
        organizationOrganizationRequest.org2Id.should.equal("456");
        organizationOrganizationRequest.donation.should.equal(true);
        organizationOrganizationRequest.status.should.equal(9);
        organizationOrganizationRequest.quote.should.equal(45);
        organizationOrganizationRequest.thread.should.have.length(2);
    });

  });

  describe('PUT /api/v1/organizationOrganizationRequests/:id', function() {
    var updatedOrganizationOrganizationRequest;

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/organizationOrganizationRequests/' + newOrganizationOrganizationRequest._id)
        .send({
          org1Id: "33",
          org2Id: "45"
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOrganizationOrganizationRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOrganizationOrganizationRequest = {};
    });

    it('should respond with the updated OrganizationOrganizationRequest', function() {
        updatedOrganizationOrganizationRequest.org1Id.should.equal("33");
        updatedOrganizationOrganizationRequest.org2Id.should.equal("45");
        updatedOrganizationOrganizationRequest.donation.should.equal(true);
        updatedOrganizationOrganizationRequest.status.should.equal(9);
        updatedOrganizationOrganizationRequest.quote.should.equal(45);
        updatedOrganizationOrganizationRequest.thread.should.have.length(2);
    });

  });

  describe('DELETE /api/v1/organizationOrganizationRequests/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/organizationOrganizationRequests/' + newOrganizationOrganizationRequest._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when OrganizationOrganizationRequest does not exist', function(done) {
      request(app)
        .delete('/api/v1/organizationOrganizationRequests/' + newOrganizationOrganizationRequest._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
