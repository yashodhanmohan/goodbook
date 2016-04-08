'use strict';
var User = require('../user/user.model');

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var OrganizationSchema = new mongoose.Schema({
    name: String,
    location: [String],
    /*location: {
        type: [Number],
        index: '2d'
    },*/
    email: String,
    username: String,
    password: String,
    address: String,
    baName: String,
    baNumber: String,
    bankName: String,
    bankBranch: String,
    aboutUs: String,
    contactNo: String,
    karma: Number,
    NGO: Boolean,
    CSR: Boolean,
	tags : [String],
    subscribers:[String],
	verified:{ type:Boolean,
				default: false}
    /*subscribers :[{
	type: mongoose.Schema.Types.ObjectId,
	ref : User
	}]*/   
});

export default mongoose.model('Organization', OrganizationSchema);
