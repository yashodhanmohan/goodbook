'use strict';

var app = require('../..');
import request from 'supertest';

var newEventRequest;

describe('EventRequest API:', function() {

  describe('GET /api/v1/eventRequests', function() {
    var eventRequests;
    beforeEach(function(done) {
      request(app)
        .get('/api/v1/eventRequests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          eventRequests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      eventRequests.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/v1/eventRequests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/eventRequests')
        .send({
    		"status": "pending",
    		"userId": "123",
    		"eventId": "1"
    	})
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEventRequest = res.body;
          done();
        });
    });

    it('should respond with the newly created eventRequest', function() {
        newEventRequest.status.should.equal("pending");
        newEventRequest.userId.should.equal("123");
        newEventRequest.eventId.should.equal("1");
    });

  });

  describe('GET /api/v1/eventRequests/:id', function() {
    var eventRequest;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/eventRequests/' + newEventRequest._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          eventRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      eventRequest = {};
    });

    it('should respond with the requested EventRequest', function() {
        eventRequest.status.should.equal("pending");
        eventRequest.userId.should.equal("123");
        eventRequest.eventId.should.equal("1");
    });

  });

  describe('PUT /api/v1/eventRequests/:id', function() {
    var updatedEventRequest;

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/eventRequests/' + newEventRequest._id)
        .send({
          status: 'rejected'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEventRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEventRequest = {};
    });

    it('should respond with the updated EventRequest', function() {
        updatedEventRequest.status.should.equal("rejected");
        updatedEventRequest.userId.should.equal("123");
        updatedEventRequest.eventId.should.equal("1");
    });

  });

  describe('DELETE /api/v1/eventRequests/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/eventRequests/' + newEventRequest._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when EventRequest does not exist', function(done) {
      request(app)
        .delete('/api/v1/eventRequests/' + newEventRequest._id)
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
