'use strict';

var app = require('../..');
import request from 'supertest';

var newNotification;

describe('Notification API:', function() {

  describe('GET /api/v1/notifications', function() {
    var notifications;
    beforeEach(function(done) {
      request(app)
        .get('/api/v1/notifications')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          notifications = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      notifications.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/v1/notifications', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/notifications')
        .send({
    		"userId": "ABC",
    		"organization": false,
    		"notifications": [
                {
                    nNo : 22,
                    content: "New Request"
                },
                {
                    nNo : 222,
                    content: "Old Request"
                }
            ]
    	})
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newNotification = res.body;
          done();
        });
    });

    it('should respond with the newly created notification', function() {
        newNotification.userId.should.equal("ABC");
        newNotification.organization.should.equal(false);
        newNotification.notifications.should.have.length(2);
        newNotification.notifications[1].nNo.should.equal(222);
    });

  });

  describe('GET /api/v1/notifications/:id', function() {
    var notification;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/notifications/' + newNotification._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          notification = res.body;
          done();
        });
    });

    afterEach(function() {
      notification = {};
    });

    it('should respond with the requested Notification', function() {
        notification.userId.should.equal("ABC");
        notification.organization.should.equal(false);
        notification.notifications.should.have.length(2);
        notification.notifications[1].nNo.should.equal(222);
    });

  });

  describe('PUT /api/v1/notifications/:id', function() {
    var updatedNotification;

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/notifications/' + newNotification._id)
        .send({
          userId: "DEF"
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedNotification = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNotification = {};
    });

    it('should respond with the updated Notification', function() {
        updatedNotification.userId.should.equal("DEF");
        updatedNotification.organization.should.equal(false);
        updatedNotification.notifications.should.have.length(2);
        updatedNotification.notifications[1].nNo.should.equal(222);
    });

  });

  describe('DELETE /api/v1/notifications/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/notifications/' + newNotification._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Notification does not exist', function(done) {
      request(app)
        .delete('/api/v1/notifications/' + newNotification._id)
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
