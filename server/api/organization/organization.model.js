'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var OrganizationSchema = new mongoose.Schema({
    name: String,
    location: {
        type: [Number],
        index: '2d'
    },
    email: String,
    username: String,
    password: String,
    address: String,
    baName: String,
    baNumber: String,
    bankName: String,
    bankBranch: String,
    aboutUs: String,
    contactNo: String
});

export default mongoose.model('Organization', OrganizationSchema);
