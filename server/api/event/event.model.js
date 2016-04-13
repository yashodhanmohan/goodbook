'use strict';
var User = require('../user/user.model');
var NGO = require('../organization/organization.model');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var EventSchema = new mongoose.Schema({
    name: String,
    location: String,
    // location: {
    //     type: [Number],
    //     index: '2d'
    // },
    project: Boolean,
    startDate: Date,
    endDate: Date,
    organizations:[String],
    volunteers:[String],
    /*organizations: [{
	type: mongoose.Schema.Types.ObjectId,
	ref : NGO
	}],
    volunteers: [{
	type: mongoose.Schema.Types.ObjectId,
	ref : User
	}],*/				
    skilled: Boolean,
    description: String,
    scale: Number,
    tags: [String]
});

export default mongoose.model('Event', EventSchema);
