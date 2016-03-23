'use strict';
var EVENT = require('../event/event.model');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GallerySchema = new mongoose.Schema({
    image : String,//It is a binary typpe, but it is stored as a string. btoa() and atob() functions
    description: String,
    eventId: String,
    timeStamp : Date
    /*eventID :{
	type: mongoose.Schema.Types.ObjectId,
	ref : EVENT
	}*/
});

export default mongoose.model('Gallery', GallerySchema);
