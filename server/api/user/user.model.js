'use strict';
var NGO = require('../organization/organization.model');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dob: Date,
    email: String,
    username: String,
    password: String,
    contactNo: String,
    interests: [String],
    creditCard: String,
    wallet: String,
    lastLogin: Date,
    karma: Number,
    location: {
        type: [Number],
        index: '2d'
    },
	studiedAt: String,
	livesAt: String,
    aboutMe: String,
    gender: String,
    tags: [String],
    donated: Number,
    profilePic: Buffer,
    /*subscribedNGO :[{
    type: mongoose.Schema.Types.ObjectId,
    ref : NGO
    }]*/
    subscribedNGO: [String]
});

export default mongoose.model('User', UserSchema);
