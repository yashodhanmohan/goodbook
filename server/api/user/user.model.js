'use strict';
var NGO = require('../organization/organization.model');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: Date,
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNo: String,
    interests: [String],
    creditCard: String,
    wallet: String,
    lastLogin: {
        type: String,
        default: Date.now
    },
    karma: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    location: {
        type: [Number],
        index: '2d'
    },
	studiedAt: String,
	livesAt: String,
    aboutMe: String,
    gender: String,
    tags: [String],
    donated: {
        type: Number,
        default: 0
    },
    profilePic: String,
    subscribedNGO: [String]
});

export default mongoose.model('User', UserSchema);
