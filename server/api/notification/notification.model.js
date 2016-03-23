'use strict';
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var NotificationSchema = new mongoose.Schema({
    userId : String,
    /*userId : mongoose.Schema.Types.ObjectId*/
    organization : Boolean,
    notifications : [{
                nNo : Number,
                content : String
            }]
 });

export default mongoose.model('Notification', NotificationSchema);
