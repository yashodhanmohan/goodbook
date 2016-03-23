'use strict';
var NGO = require('../organization/organization.model');
var USER = require('../user/user.model');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var QuerySchema = new mongoose.Schema({
    orgs : [String],
    /*orgs : [{
	type: mongoose.Schema.Types.ObjectId,
	ref : NGO
	}]*/
    users : [String],
    /*orgs : [{
	type: mongoose.Schema.Types.ObjectId,
	ref : USER
	}]*/
    thread : [{
                org : Boolean,
                //orgIdIndex: mongoose.Schema.Types.ObjectId,
                orgIdIndex : String,
                message: String
            }]
 });

export default mongoose.model('Query', QuerySchema);
