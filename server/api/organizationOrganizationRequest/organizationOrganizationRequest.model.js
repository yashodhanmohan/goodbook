'use strict';
var NGO = require('../organization/organization.model');

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var OrganizationOrganizationRequestSchema = new mongoose.Schema({
    //org1Id: mongoose.Schema.Types.ObjectId,
    org1Id : String,
    //org2Id: mongoose.Schema.Types.ObjectId,
    org2Id : String,
    donation: Boolean,
    status: Number,
    quote:Number,
    /*orgs : [{
	type: mongoose.Schema.Types.ObjectId,
	ref : USER
	}]*/
    thread : [{
                orgId : String,
                //orgId: mongoose.Schema.Types.ObjectId,
                message: String
            }]
 });

export default mongoose.model('OrganizationOrganizationRequest', OrganizationOrganizationRequestSchema);
