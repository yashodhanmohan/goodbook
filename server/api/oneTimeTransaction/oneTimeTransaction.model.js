'use strict';

var NGO = require('../organization/organization.model');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var oneTimeTransactionSchema = new mongoose.Schema({
    /*payeeID: mongoose.Schema.Types.ObjectId,
    payerID: {
	type: mongoose.Schema.Types.ObjectId,
	ref : User
	},*/
    emailId : String,
    contactNo : String,
    organizationId: String,
    /*
    organizationId:
    {
	type: mongoose.Schema.Types.ObjectId,
	ref : NGO
	},*/
    timeStamp: { 
        type : Date, 
		default: Date.now()
	},
    eventDonate:Boolean,
    pgTxId: String,
    success: String,
    amount : Number
});

export default mongoose.model('oneTimeTransaction', oneTimeTransactionSchema);
