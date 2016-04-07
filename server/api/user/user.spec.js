'use strict';

var app = require('../..');
import request from 'supertest';

var newUser;

describe('User API:', function() {

    describe('GET /api/v1/users', function() {
        var users;
        beforeEach(function(done) {
            request(app)
                .get('/api/v1/users')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    users = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function() {
            users.should.be.instanceOf(Array);
        });

    });

    describe('POST /api/v1/users', function() {
        beforeEach(function(done) {
            request(app)
                .post('/api/v1/users')
                .send({
                    "firstName": "Lion",
                    "lastName": "Giraffe",
                    "dob": "2016-06-21T20:59:41-07:00",
                    "email": "nunc@nibh.co.uk",
                    "username": "AvramChrist",
                    "password": "YFY89IPH2FA",
                    "contactNo": "(0220) 678 4471",
                    "interests": ["reading", "writing"],
                    "creditCard": "1234",
                    "wallet": "2345",
                    "lastLogin": new Date('2014-01-22T14:56:59.301Z'),
                    "karma": 404,
                    "location": [33.2, 22.3],
                    "aboutMe": "I am a dummy object created for testing. I will be killed soon.",
                    subscribedNGO: ["1", "2"]

                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newUser = res.body;
                    done();
                });
        });

        it('should respond with the newly created user', function() {
            newUser.firstName.should.equal('Lion');
            newUser.lastName.should.equal('Giraffe');
            newUser.dob.should.equal('2016-06-22T03:59:41.000Z');
            newUser.email.should.equal('nunc@nibh.co.uk');
            newUser.username.should.equal('AvramChrist');
            newUser.password.should.equal('YFY89IPH2FA');
            newUser.contactNo.should.equal('(0220) 678 4471');
            newUser.interests.should.have.length(2);
            newUser.creditCard.should.equal("1234");
            newUser.wallet.should.equal("2345");
            newUser.lastLogin.should.equal('2014-01-22T14:56:59.301Z');
            newUser.karma.should.equal(404);
            newUser.location.should.have.length(2);
            newUser.aboutMe.should.equal("I am a dummy object created for testing. I will be killed soon.");
            newUser.subscribedNGO.should.have.length(2);

        });

    });

    describe('GET /api/v1/users/:id', function() {
        var user;

        beforeEach(function(done) {
            request(app)
                .get('/api/v1/users/' + newUser._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    user = res.body;
                    done();
                });
        });

        afterEach(function() {
            user = {};
        });

        it('should respond with the requested user', function() {
            user.firstName.should.equal('Lion');
            user.lastName.should.equal('Giraffe');
            user.dob.should.equal('2016-06-22T03:59:41.000Z');
            user.email.should.equal('nunc@nibh.co.uk');
            user.username.should.equal('AvramChrist');
            user.password.should.equal('YFY89IPH2FA');
            user.contactNo.should.equal('(0220) 678 4471');
            user.interests.should.have.length(2);
            user.creditCard.should.equal("1234");
            user.wallet.should.equal("2345");
            user.lastLogin.should.equal('2014-01-22T14:56:59.301Z');
            user.karma.should.equal(404);
            user.location.should.have.length(2);
            user.aboutMe.should.equal("I am a dummy object created for testing. I will be killed soon.");
            user.subscribedNGO.should.have.length(2);
        });

    });

    describe('PUT /api/v1/users/:id', function() {
        var updatedUser;

        beforeEach(function(done) {
            request(app)
                .put('/api/v1/users/' + newUser._id)
                .send({
                    firstName: 'Tiger',
                    lastName: 'Shroff'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedUser = res.body;
                    done();
                });
        });

        afterEach(function() {
            updatedUser = {};
        });

        it('should respond with the updated user', function() {
            updatedUser.firstName.should.equal('Tiger');
            updatedUser.lastName.should.equal('Shroff');
            updatedUser.dob.should.equal('2016-06-22T03:59:41.000Z');
            updatedUser.email.should.equal('nunc@nibh.co.uk');
            updatedUser.username.should.equal('AvramChrist');
            updatedUser.password.should.equal('YFY89IPH2FA');
            updatedUser.contactNo.should.equal('(0220) 678 4471');
            updatedUser.interests.should.have.length(2);
            updatedUser.creditCard.should.equal("1234");
            updatedUser.wallet.should.equal("2345");
            updatedUser.lastLogin.should.equal('2014-01-22T14:56:59.301Z');
            updatedUser.karma.should.equal(404);
            updatedUser.location.should.have.length(2);
            updatedUser.aboutMe.should.equal("I am a dummy object created for testing. I will be killed soon.");
            updatedUser.subscribedNGO.should.have.length(2);
        });

    });

    describe('DELETE /api/v1/users/:id', function() {

        it('should respond with 204 on successful removal', function(done) {
            request(app)
                .delete('/api/v1/users/' + newUser._id)
                .expect(204)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when user does not exist', function(done) {
            request(app)
                .delete('/api/v1/users/' + newUser._id)
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
