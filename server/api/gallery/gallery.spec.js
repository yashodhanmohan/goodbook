'use strict';

var app = require('../..');
import request from 'supertest';

var z = new Buffer("Hello").toString();
var newGallery;

describe('Gallery API:', function() {

  describe('GET /api/v1/gallerys', function() {
    var gallerys;
    beforeEach(function(done) {
      request(app)
        .get('/api/v1/gallerys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          gallerys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      gallerys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/v1/gallerys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/gallerys')
        .send({
    		"image": z,
    		"description": "123",
    		"timeStamp": new Date('2014-01-22T14:56:59.301Z'),
    		"eventId": "1"
    	})
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newGallery = res.body;
          done();
        });
    });

    it('should respond with the newly created gallery', function() {
        newGallery.image.should.equal(z);
        newGallery.description.should.equal("123");
        newGallery.timeStamp.should.equal('2014-01-22T14:56:59.301Z');
        newGallery.eventId.should.equal("1");
    });

  });

  describe('GET /api/v1/gallerys/:id', function() {
    var gallery;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/gallerys/' + newGallery._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          gallery = res.body;
          done();
        });
    });

    afterEach(function() {
      gallery = {};
    });

    it('should respond with the requested Gallery', function() {
        gallery.image.should.equal(z);
        gallery.description.should.equal("123");
        gallery.timeStamp.should.equal('2014-01-22T14:56:59.301Z');
        gallery.eventId.should.equal("1");
    });

  });

  describe('PUT /api/v1/gallerys/:id', function() {
    var updatedGallery;

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/gallerys/' + newGallery._id)
        .send({
          eventId: '2'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGallery = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGallery = {};
    });

    it('should respond with the updated Gallery', function() {
        updatedGallery.image.should.equal(z);
        updatedGallery.description.should.equal("123");
        updatedGallery.timeStamp.should.equal('2014-01-22T14:56:59.301Z');
        updatedGallery.eventId.should.equal("2");
    });

  });

  describe('DELETE /api/v1/gallerys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/gallerys/' + newGallery._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Gallery does not exist', function(done) {
      request(app)
        .delete('/api/v1/gallerys/' + newGallery._id)
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
