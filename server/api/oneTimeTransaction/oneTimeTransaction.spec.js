'use strict';

var app = require('../..');
import request from 'supertest';

var newOneTimeTransaction;

describe('OneTimeTransaction API:', function() {

  describe('GET /api/v1/onetimetransactions', function() {
    var onetimetransactions;
    beforeEach(function(done) {
      request(app)
        .get('/api/v1/onetimetransactions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          onetimetransactions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      onetimetransactions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/v1/onetimetransactions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/onetimetransactions')
        .send({
    		"emailId": "manual@sen.com",
    		"contactNo": "123456",
    		"organizationId": "123",
    		"timeStamp": new Date('2014-01-22T14:56:59.301Z'),
    		"eventDonate": true,
            "pgTxId" : "1",
    		"success": "waiting",
            "amount" : 42
            
    	})
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newOneTimeTransaction = res.body;
          done();
        });
    });

    it('should respond with the newly created onetimetransaction', function() {
        newOneTimeTransaction.emailId.should.equal("manual@sen.com");
        newOneTimeTransaction.contactNo.should.equal("123456");
        newOneTimeTransaction.eventDonate.should.equal(true);
        newOneTimeTransaction.pgTxId.should.equal("1");
        newOneTimeTransaction.success.should.equal("waiting");
        newOneTimeTransaction.amount.should.equal(42);
        newOneTimeTransaction.timeStamp.should.equal('2014-01-22T14:56:59.301Z');
        
    });

  });

  describe('GET /api/v1/onetimetransactions/:id', function() {
    var oneTimeTransaction;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/onetimetransactions/' + newOneTimeTransaction._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          oneTimeTransaction = res.body;
          done();
        });
    });

    afterEach(function() {
      oneTimeTransaction = {};
    });

    it('should respond with the requested OneTimeTransaction', function() {
        oneTimeTransaction.emailId.should.equal("manual@sen.com");
        oneTimeTransaction.contactNo.should.equal("123456");
        oneTimeTransaction.eventDonate.should.equal(true);
        oneTimeTransaction.pgTxId.should.equal("1");
        oneTimeTransaction.success.should.equal("waiting");
        oneTimeTransaction.amount.should.equal(42);
        oneTimeTransaction.timeStamp.should.equal('2014-01-22T14:56:59.301Z');
    });

  });

  describe('PUT /api/v1/onetimetransactions/:id', function() {
    var updatedOneTimeTransaction;

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/onetimetransactions/' + newOneTimeTransaction._id)
        .send({
          success: 'Done'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOneTimeTransaction = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOneTimeTransaction = {};
    });

    it('should respond with the updated OneTimeTransaction', function() {
        updatedOneTimeTransaction.emailId.should.equal("manual@sen.com");
        updatedOneTimeTransaction.contactNo.should.equal("123456");
        updatedOneTimeTransaction.eventDonate.should.equal(true);
        updatedOneTimeTransaction.pgTxId.should.equal("1");
        updatedOneTimeTransaction.success.should.equal("Done");
        updatedOneTimeTransaction.amount.should.equal(42);
        updatedOneTimeTransaction.timeStamp.should.equal('2014-01-22T14:56:59.301Z');
    });

  });

  describe('DELETE /api/v1/onetimetransactions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/onetimetransactions/' + newOneTimeTransaction._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when OneTimeTransaction does not exist', function(done) {
      request(app)
        .delete('/api/v1/onetimetransactions/' + newOneTimeTransaction._id)
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
