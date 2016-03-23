'use strict';

var app = require('../..');
import request from 'supertest';

var newEvent;

describe('Event API:', function() {

  describe('GET /api/v1/Events', function() {
    var Events;
    beforeEach(function(done) {
      request(app)
        .get('/api/v1/Events')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Events = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Events.should.be.instanceOf(Array);
    });

  });


  describe('POST /api/v1/Events', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/Events')
        .send({
            "name": 'Save the tiger',
            "location": 3,
            "project" : true,
            "startDate" :new Date('2014-01-22T14:56:59.301Z'),
            "endDate" : new Date('2014-01-22T14:56:59.301Z'),
    		"organizations": [1234 , 5678],
    		"volunteers" : [333, 12345],
    		"skilled" : true,
    		"description": 'Gjoa Haven',
    		"scale": 9
    	})
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEvent = res.body;
          done();
        });
    });

    it('should respond with the newly created Event', function() {
      newEvent.name.should.equal('Save the tiger');
      newEvent.location.should.equal(3);
      newEvent.project.should.equal(true);
      newEvent.startDate.should.equal('2014-01-22T14:56:59.301Z');
      newEvent.endDate.should.equal('2014-01-22T14:56:59.301Z');
      //newEvent.organizations.should.equal( [ 1234 , 5678 ]);
      //newEvent.volunteers.should.equal([333,12345]);
      newEvent.volunteers.should.have.length(2);
      newEvent.organizations.should.have.length(2);
      newEvent.skilled.should.equal(true);
      newEvent.description.should.equal('Gjoa Haven');
      newEvent.scale.should.equal(9);
    });

  });

  describe('GET /api/v1/Events/:id', function() {
    var Event;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/Events/' + newEvent._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Event = res.body;
          done();
        });
    });

    afterEach(function() {
      Event = {};
    });

    it('should respond with the requested Event', function() {
        Event.name.should.equal("Save the tiger");
        Event.project.should.equal(true);
        Event.location.should.equal(3);
        Event.startDate.should.equal("2014-01-22T14:56:59.301Z");
        Event.endDate.should.equal("2014-01-22T14:56:59.301Z");
        Event.volunteers.should.have.length(2);
        Event.organizations.should.have.length(2);
        Event.skilled.should.equal(true);
        Event.description.should.equal('Gjoa Haven');
        Event.scale.should.equal(9);    
    });

  });

  describe('PUT /api/v1/Events/:id', function() {
    var updatedEvent;

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/Events/' + newEvent._id)
        .send({
          name: 'Something new'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEvent = {};
    });

    it('should respond with the updated Event', function() {
        updatedEvent.name.should.equal("Something new");
        updatedEvent.project.should.equal(true);
        updatedEvent.location.should.equal(3);
        updatedEvent.startDate.should.equal("2014-01-22T14:56:59.301Z");
        updatedEvent.endDate.should.equal("2014-01-22T14:56:59.301Z");
        updatedEvent.volunteers.should.have.length(2);
        updatedEvent.organizations.should.have.length(2);
        updatedEvent.skilled.should.equal(true);
        updatedEvent.description.should.equal('Gjoa Haven');
        updatedEvent.scale.should.equal(9);  
    });

  });

  describe('DELETE /api/v1/Events/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/Events/' + newEvent._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Event does not exist', function(done) {
      request(app)
        .delete('/api/v1/Events/' + newEvent._id)
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
