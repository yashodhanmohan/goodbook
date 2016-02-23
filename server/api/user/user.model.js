'use strict';

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
    creditCard:[{
        ccNumber: Number,
        ccMonth: Number,
        ccYear: Number,
        cvv: Number,
        ccName: Number,
    }]
});

export default mongoose.model('User', UserSchema);
