'use strict';

var app = require('../..');
import request from 'supertest';

var z = new Buffer("Hello").toString();
var newQuery;

describe('Query API:', function() {

  describe('GET /api/v1/querys', function() {
    var querys;
    beforeEach(function(done) {
      request(app)
        .get('/api/v1/querys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          querys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      querys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/v1/querys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/querys')
        .send({
    		"orgs": ["1","2"],
    		"users": ["123"],
    		"thread": [
                {
                    org: false,
                    orgIdIndex: "1",
                    message: "Test Message From User"
                },
                {
                    org: true,
                    orgIdIndex: "2",
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
          newQuery = res.body;
          done();
        });
    });

    it('should respond with the newly created query', function() {
        newQuery.orgs.should.have.length(2);
        newQuery.users.should.have.length(1);
        newQuery.thread.should.have.length(2);
        newQuery.thread[0].org.should.equal(false);
    });

  });

  describe('GET /api/v1/querys/:id', function() {
    var query;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/querys/' + newQuery._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          query = res.body;
          done();
        });
    });

    afterEach(function() {
      query = {};
    });

    it('should respond with the requested Query', function() {
        query.orgs.should.have.length(2);
        query.users.should.have.length(1);
        query.thread.should.have.length(2);
        query.thread[0].org.should.equal(false);
    });

  });

  describe('PUT /api/v1/querys/:id', function() {
    var updatedQuery;

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/querys/' + newQuery._id)
        .send({
          orgs: ["2", "4", "5", "6"]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedQuery = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQuery = {};
    });

    it('should respond with the updated Query', function() {
        updatedQuery.orgs.should.have.length(4);
        updatedQuery.users.should.have.length(1);
        updatedQuery.thread.should.have.length(2);
        updatedQuery.thread[0].org.should.equal(false);
    });

  });

  describe('DELETE /api/v1/querys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/querys/' + newQuery._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Query does not exist', function(done) {
      request(app)
        .delete('/api/v1/querys/' + newQuery._id)
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
