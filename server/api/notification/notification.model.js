'use strict';
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SingleNotification = new mongoose.Schema({
    type: Number,
    nNo: Number,
    content: String,
    eventId: String
});

var NotificationSchema = new mongoose.Schema({
    userId: String,
    /*userId : mongoose.Schema.Types.ObjectId*/
    organization: Boolean,
    notifications: [SingleNotification]
});

export default mongoose.model('Notification', NotificationSchema);

// Notification types:
// 1: Volunteer call
// 2: Query reply
