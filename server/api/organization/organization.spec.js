'use strict';

var app = require('../..');
import request from 'supertest';

var newOrganization;

describe('Organization API:', function() {

  describe('GET /api/v1/organizations', function() {
    var organizations;
    beforeEach(function(done) {
      request(app)
        .get('/api/v1/organizations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          organizations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      organizations.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/v1/organizations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/organizations')
        .send({
    		"name": "Donec.",
    		"email": "leo@libaccumsan.edu",
            "location": ["35", "47"],
    		"username": "Jey",
    		"password": "YF6513Y8DB",
    		"address": "Ap #5 Que Avenue",
    		"baName": "Vahan",
    		"baNumber": "5245 9360052471",
    		"bankName": "Convas Conis Dolor LLC",
    		"bankBranch": "Gjoa Haven",
    		"aboutUs": "nibh. Aliqo at auctor ullamcorper, nisl arcu iaculis enim, sit amet",
    		"contactNo": "055 5876 4743",
            "karma":35,
            "NGO": true,
            "CSR": true,
            "subscribers" : ["1", "2", "3"]
    	})
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newOrganization = res.body;
          done();
        });
    });

    it('should respond with the newly created organization', function() {
      newOrganization.name.should.equal('Donec.');
      newOrganization.email.should.equal('leo@libaccumsan.edu');
      newOrganization.location.should.have.length(2);
      newOrganization.username.should.equal('Jey');
      newOrganization.password.should.equal('YF6513Y8DB');
      newOrganization.address.should.equal('Ap #5 Que Avenue');
      newOrganization.baName.should.equal('Vahan');
      newOrganization.baNumber.should.equal('5245 9360052471');
      newOrganization.bankName.should.equal('Convas Conis Dolor LLC');
      newOrganization.bankBranch.should.equal('Gjoa Haven');
      newOrganization.aboutUs.should.equal('nibh. Aliqo at auctor ullamcorper, nisl arcu iaculis enim, sit amet');
      newOrganization.contactNo.should.equal('055 5876 4743');
      newOrganization.karma.should.equal(35);
      newOrganization.NGO.should.equal(true);
      newOrganization.CSR.should.equal(true);
      newOrganization.subscribers.should.have.length(3);
      
    });

  });

  describe('GET /api/v1/organizations/:id', function() {
    var organization;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/organizations/' + newOrganization._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          organization = res.body;
          done();
        });
    });

    afterEach(function() {
      organization = {};
    });

    it('should respond with the requested organization', function() {
      organization.name.should.equal('Donec.');
      organization.email.should.equal('leo@libaccumsan.edu');
      organization.location.should.have.length(2);
      organization.username.should.equal('Jey');
      organization.password.should.equal('YF6513Y8DB');
      organization.address.should.equal('Ap #5 Que Avenue');
      organization.baName.should.equal('Vahan');
      organization.baNumber.should.equal('5245 9360052471');
      organization.bankName.should.equal('Convas Conis Dolor LLC');
      organization.bankBranch.should.equal('Gjoa Haven');
      organization.aboutUs.should.equal('nibh. Aliqo at auctor ullamcorper, nisl arcu iaculis enim, sit amet');
      organization.contactNo.should.equal('055 5876 4743');
      organization.karma.should.equal(35);
      organization.NGO.should.equal(true);
      organization.CSR.should.equal(true);
      organization.subscribers.should.have.length(3);
    });

  });

  describe('PUT /api/v1/organizations/:id', function() {
    var updatedOrganization;

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/organizations/' + newOrganization._id)
        .send({
          name: 'Something new'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOrganization = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOrganization = {};
    });

    it('should respond with the updated organization', function() {
        updatedOrganization.name.should.equal('Something new');
        updatedOrganization.email.should.equal('leo@libaccumsan.edu');
        updatedOrganization.location.should.have.length(2);
        updatedOrganization.username.should.equal('Jey');
        updatedOrganization.password.should.equal('YF6513Y8DB');
        updatedOrganization.address.should.equal('Ap #5 Que Avenue');
        updatedOrganization.baName.should.equal('Vahan');
        updatedOrganization.baNumber.should.equal('5245 9360052471');
        updatedOrganization.bankName.should.equal('Convas Conis Dolor LLC');
        updatedOrganization.bankBranch.should.equal('Gjoa Haven');
        updatedOrganization.aboutUs.should.equal('nibh. Aliqo at auctor ullamcorper, nisl arcu iaculis enim, sit amet');
        updatedOrganization.contactNo.should.equal('055 5876 4743');
        updatedOrganization.karma.should.equal(35);
        updatedOrganization.NGO.should.equal(true);
        updatedOrganization.CSR.should.equal(true);
        updatedOrganization.subscribers.should.have.length(3);
    });

  });

  describe('DELETE /api/v1/organizations/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/organizations/' + newOrganization._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when organization does not exist', function(done) {
      request(app)
        .delete('/api/v1/organizations/' + newOrganization._id)
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
