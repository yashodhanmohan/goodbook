/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/organizations              ->  index
 * POST    /api/organizations              ->  create
 * GET     /api/organizations/:id          ->  show
 * PUT     /api/organizations/:id          ->  update
 * DELETE  /api/organizations/:id          ->  destroy
 */

'use strict';
var nodemailer = require('nodemailer');
import _ from 'lodash';
import Organization from './organization.model';

var transporter = nodemailer.createTransport('smtps://sen%2Egoodbook%40gmail.com:goodbooksen30@smtp.gmail.com');

//This function changes the password and sends an email to the organization informing
//him/her about the same
function changePassword(x) {
    var randomstring = Math.random().toString(36).slice(-8);
    if(x){
    Organization.findById(x._id, function(err, result) {
        result.password = randomstring;
        result.save();
    });

    changePasswordMail(x, randomstring);
    return x;
    }
    else{
        return null;        
    }
}

//This function is a utility function that is used to send an email to the organization
//with the new password included in the mail.
function changePasswordMail(x, y) {
    var mailOptions = {
        from: '"Project Goodbook" <info@goodbook.com>', // sender address
        to: x.email, // list of receivers
        subject: 'Password Changed', // Subject line
        text: 'Dear ' + x.name + ',\n\nAs per your request your password has been changed. The new password is:' + y + '\n\nIf you had not requested this change, please let us know by replying to this mail.\n\nTrying to make a difference,\nTeam Project Goodbook' // 
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}


//This function sends a mail to the organization welcoming him/her to the platform
function welcomeMail(x) {
    var mailOptions = {
        from: '"Project Goodbook" <info@goodbook.com>', // sender address
        to: x.email, // list of receivers
        subject: 'Welcome to Project Goodbook', // Subject line
        text: 'Dear ' + x.name + ',\n\nWelcome to Project Goodbook. \nYour account will be verified by our team based on the documents that you have submitted. In case of any problems, we will get back to you.\n\nLet us work together to make this world a better place to live in.\nTeam Project Goodbook' // 
    };

    return x;
    transporter.sendMail(mailOptions,function(error, info){
    if(error){
     return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    });
}

//This function is used to create tags when a profile is created or updated.
function tagData(x) {
    var tempTags = [x.username];
    tempTags.push(x.name.toLowerCase());
    tempTags.push(x.email);
    x.tags = [];
    x.tags = x.tags.concat(tempTags);
    Organization.update({_id: x._id}, {$set: {
        tags: x.tags
    }}, function(err, result) {
        return result;
    });
    return x;
}


//This function is used to check if the password entered by the organization for login purpose 
//is correct or incorrect
function checkPassword(req, res, statusCode) {
    statusCode = statusCode || 200;

    return function(entity) {
        if (!entity) {
            res.status(301).end();
            return null;
        }
        if (entity.password === req.body.password) {
            console.log("Passwords match");
            res.status(statusCode).json(entity);
        } else {
            res.status(301).end();
            return null;
        }

    };
}


function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
            return entity;
        }
    };
}


//Function to save updates.
function saveUpdates(updates) {
    return function(entity) {
        // entity.subscribers = [];
        entity.set(updates);
        return entity.save();
    };
}

//Function to delete entry from db
function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

//Function to handle the case when entity
//is not found in db
function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

//Function to handle other errors.
function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Organizations
export function index(req, res) {
    if (!_.isEmpty(req.query)) {
        Organization.findOne(req.query)
            .then(respondWithResult(res))
            .catch(handleError(res));
    } else {
        respondWithResult(res, 403)({});
    }
}

// Gets a single Organization from the DB
export function show(req, res) {
    Organization.findById(req.params.id)
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

//To check for login
export function login(req, res) {
    Organization.findOne({ username: req.body.username })
        .then(checkPassword(req, res))
        .catch(handleError(res));
}

// Creates a new Organization in the DB
export function create(req, res) {
    Organization.create(req.body)
        .then(respondWithResult(res, 201))
        .then(tagData)
        .then(welcomeMail)
        .catch(handleError(res));
}

// Updates an existing Organization in the DB
export function update(req, res) {
    Organization.findById(req.params.id)
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .then(tagData)
        .catch(handleError(res));
}

// Deletes a Organization from the DB
export function destroy(req, res) {
    Organization.findById(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

//When an organization requests for a password change,
//this function is called
export function forgotPassword(req, res) {
    Organization.findOne({ username: req.body.username })
        .then(handleEntityNotFound(res))
        .then(changePassword)
        .then(respondWithResult(res))
        .catch(handleError(res))
}


//Search for organizations with certain tags.
export function search(req, res) {
    var temp = req.body.query.split(" ");
    var search_terms = [];
    search_terms = search_terms.concat(temp);
    for (var s in temp) {
        search_terms.push(temp[s].toLowerCase());
    }
    Organization.find({
            tags: {
                $in: search_terms
            }
        })
        .then(respondWithResult(res))
        .catch(handleError);
}

//Add/remove subscribers.
export function subscription(req, res) {
    if(req.query) {
        if(req.query.subscribe) {
            Organization.findById(req.params.id)
                .then(function(result){
                    result.subscribers = _.merge(result.subscribers, [req.query.subscribe]);
                    result.markModified('subscribers');
                    result.save()
                        .then(respondWithResult(res))
                })
                .catch(handleError(res))
        }
        else if(req.query.unsubscribe) {
            Organization.findById(req.params.id)
                .then(function(result){
                    _.pull(result.subscribers, req.query.unsubscribe);
                    result.markModified('subscribers');
                    result.save()
                        .then(respondWithResult(res))
                })
                .catch(handleError(res))
        }
        else 
            respondWithResult(res, 200)({});
    }
    else
        respondWithResult(res, 200)({});
}

//To return the count of Organizations
export function count1(req, res){
    Organization.find().count()
    .then(respondWithResult(res));
}
