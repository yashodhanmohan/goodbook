'use strict';

var app = require('../..');
import request from 'supertest';

var newTransaction;

describe('Transaction API:', function() {

  describe('GET /api/v1/transactions', function() {
    var transactions;
    beforeEach(function(done) {
      request(app)
        .get('/api/v1/transactions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          transactions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      transactions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/v1/transactions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/transactions')
        .send({
    		"payeeId": "ABC",
    		"payerId": "XYZ",
    		"eventDonate": true,
    		"timeStamp": new Date('2014-01-22T14:56:59.301Z'),
    		"pgTxId": "1234",
    		"success": "waiting",
    		"payerOrg": true,
            "amount" : 42
            
    	})
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTransaction = res.body;
          done();
        });
    });

    it('should respond with the newly created transaction', function() {
        newTransaction.payeeId.should.equal("ABC");
        newTransaction.payerId.should.equal("XYZ");
        newTransaction.eventDonate.should.equal(true);
        newTransaction.pgTxId.should.equal("1234");
        newTransaction.success.should.equal("waiting");
        newTransaction.payerOrg.should.equal(true);
        newTransaction.amount.should.equal(42);
        newTransaction.timeStamp.should.equal('2014-01-22T14:56:59.301Z');
        
    });

  });

  describe('GET /api/v1/transcations/:id', function() {
    var transaction;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/transactions/' + newTransaction._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          transaction = res.body;
          done();
        });
    });

    afterEach(function() {
      transaction = {};
    });

    it('should respond with the requested Transaction', function() {
        transaction.payeeId.should.equal("ABC");
        transaction.payerId.should.equal("XYZ");
        transaction.eventDonate.should.equal(true);
        transaction.pgTxId.should.equal("1234");
        transaction.success.should.equal("waiting");
        transaction.payerOrg.should.equal(true);
        transaction.amount.should.equal(42);
        transaction.timeStamp.should.equal('2014-01-22T14:56:59.301Z');
    });

  });

  describe('PUT /api/v1/transactions/:id', function() {
    var updatedTransaction;

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/transactions/' + newTransaction._id)
        .send({
          success: 'Done'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTransaction = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTransaction = {};
    });

    it('should respond with the updated Transaction', function() {
        updatedTransaction.payeeId.should.equal("ABC");
        updatedTransaction.payerId.should.equal("XYZ");
        updatedTransaction.eventDonate.should.equal(true);
        updatedTransaction.pgTxId.should.equal("1234");
        updatedTransaction.success.should.equal("Done");
        updatedTransaction.payerOrg.should.equal(true);
        updatedTransaction.amount.should.equal(42);
        updatedTransaction.timeStamp.should.equal('2014-01-22T14:56:59.301Z');
    });

  });

  describe('DELETE /api/v1/transactions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/transactions/' + newTransaction._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Transaction does not exist', function(done) {
      request(app)
        .delete('/api/v1/transactions/' + newTransaction._id)
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
