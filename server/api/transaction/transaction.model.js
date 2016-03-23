'use strict';

var NGO = require('../organization/organization.model');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TransactionSchema = new mongoose.Schema({
    /*payeeID: mongoose.Schema.Types.ObjectId,
    payerID: {
	type: mongoose.Schema.Types.ObjectId,
	ref : User
	},*/
    payeeId : String,
    payerId : String,
    eventDonate: Boolean,
    timeStamp: { type : Date, 
		 default: Date.now()
	},
    pgTxId: String,
    success: String,
    payerOrg: Boolean,
    amount : Number
});

export default mongoose.model('Transaction', TransactionSchema);
