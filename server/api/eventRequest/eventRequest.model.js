'use strict';
var EVENT = require('../event/event.model');
var USER = require('../user/user.model');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var EventRequestSchema = new mongoose.Schema({
    userId : String,//It is a binary typpe, but it is stored as a string. btoa() and atob() functions
    /*userId :{
	type: mongoose.Schema.Types.ObjectId,
	ref : USER
	}*/
    status: String,
    eventId: String
    /*eventID :{
	type: mongoose.Schema.Types.ObjectId,
	ref : EVENT
	}*/
});

export default mongoose.model('EventRequest', EventRequestSchema);
