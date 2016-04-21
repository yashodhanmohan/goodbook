/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  update
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';
var nodemailer = require('nodemailer');
import _ from 'lodash';
import User from './user.model';

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://sen%2Egoodbook%40gmail.com:goodbooksen30@smtp.gmail.com');
// send mail with defined transport object


//This function changes the password and sends an email to the user informing
//him/her about the same
function changePassword(x) {
    var randomstring = Math.random().toString(36).slice(-8);
    if (x) {
        User.findById(x._id, function(err, result) {
            result.password = randomstring;
            result.save();
        });

        changePasswordMail(x, randomstring);
        return x;
    } else {
        return null;
    }
}


//This function is a utility function that is used to send an email to the user
//with the new password included in the mail.
function changePasswordMail(x, y) {
    var mailOptions = {
        from: '"Project Goodbook" <info@goodbook.com>', // sender address
        to: x.email, // list of receivers
        subject: 'Password Changed', // Subject line
        text: 'Dear ' + x.firstName + ' ' + x.lastName + ',\n\nAs per your request your password has been changed. The new password is:' + y + '\n\nIf you had not requested this change, please let us know by replying to this mail.\n\nTrying to make a difference,\nTeam Project Goodbook' // 
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}


//This function sends a mail to the user welcoming him/her to the platform
function welcomeMail(x) {
    var mailOptions = {
        from: '"Project Goodbook" <info@goodbook.com>', // sender address
        to: x.email, // list of receivers
        subject: 'Welcome to Project Goodbook', // Subject line
        text: 'Dear ' + x.firstName + ' ' + x.lastName + ',\n\nWelcome to Project Goodbook. Let us work together to make this world a better place to live in.\n\nTeam Project Goodbook' // 
    };
    transporter.sendMail(mailOptions,function(error, info){
    if(error){
     return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    });
    return x;
}

//This function is used to create tags when a profile is created or updated.
function tagData(x) {
    var tempTags = [x.username];
    tempTags.push(x.firstName.toLowerCase());
    tempTags.push(x.lastName.toLowerCase());
    tempTags.push(x.email);
    if (x.gender)
        tempTags.push(x.gender.toLowerCase());
    for (var i in x.subscribedNGO) {
        tempTags.push(x.subscribedNGO[i].toLowerCase());
    }
    for (var i in x.interests) {
        tempTags.push(x.interests[i].toLowerCase());
    }
    x.tags = [];
    x.tags = x.tags.concat(tempTags);
    User.update({ _id: x._id }, {
        $set: {
            tags: x.tags
        }
    }, function(err, result) {
        return result;
    });
    return x;
}


//This function is used to check if the password entered by the user for login purpose 
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


//This function checks if the username with which a user wants 
//to register is alraedy in use or not. If not, it will create 
//a new user with the details that have been sent.
function registerCheck(req, res, statusCode) {
    return function(entity) {
        statusCode = statusCode || 200;
        if (entity) {
            res.status(302).end();
            return null;
        } else {
            User.create(tagData(req.body));
            res.status(statusCode).json(entity);
        }
    };
}

//Function to send back response to the client.
function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
            return entity;
        }
    };
}

//Function to save updates in the database
function saveUpdates(updates) {
    return function(entity) {
        var updated = _.merge(entity, updates);
        console.log(entity);
        console.log(updates);
        console.log(updated);
        updated.markModified('interests');
        return updated.save();
    };
}

//Function to remove an entry from the database.
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

//Function to handle the case where an entity is 
//not present in the database.
function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        else
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

// Gets a list of Users
export function index(req, res) {
    if (!_.isEmpty(req.query)) {
        User.find(req.query)
            .then(respondWithResult(res))
            .catch(handleError(res));
    } else {
        respondWithResult(res, 403)({});
    }
}

// Gets a single User from the DB
export function show(req, res) {
    User.findById(req.params.id)
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new User in the DB
export function create(req, res) {

    User.create(req.body)
        .then(tagData)
        .then(respondWithResult(res, 201))
        .then(welcomeMail)
        .catch(handleError(res));
}


//To check for login
export function login(req, res) {
    User.findOne({ username: req.body.username })
        .then(checkPassword(req, res))
        .catch(handleError(res));
}

//This function is called, when the user is logging out. 
export function logout(req, res) {
    User.findById(req.body._id)
        .then((result) => {
            result.lastLogin = Date.now();
            result.save(() => {
                res.send(200);
            });
        })
        .catch(handleError(res));
}

//Function is called when the user registers.
export function register(req, res) {
    User.findOne({ username: req.body.username })
        .then(registerCheck(req, res))
        .catch(handleError(res));
}



// Updates an existing User in the DB
export function update(req, res) {
    User.findById(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(tagData)
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a User from the DB
export function destroy(req, res) {
    User.findById(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

// Called when the user accesses the forgotPassword option.
export function forgotPassword(req, res) {
    User.findOne({ username: req.body.username })
        .then(handleEntityNotFound(res))
        .then(changePassword)
        .then(respondWithResult(res))
        .catch(handleError(res))
}


export function search(req, res) {
    var temp = req.body.query.split(" ");
    var search_terms = [];
    search_terms = search_terms.concat(temp);
    for (var s in temp) {
        search_terms.push(temp[s].toLowerCase());
    }
    User.find({
            tags: {
                $in: search_terms
            }
        })
        .then(respondWithResult(res))
        .catch(handleError);
}

//When user wants to subscribe to an NGO
export function subscription(req, res) {
    if (req.query) {
        if (req.query.subscribe) {
            User.findById(req.params.id)
                .then(function(result) {
                    console.log(result.subscribedNGO);
                    result.subscribedNGO = _.uniq(result.subscribedNGO.concat([req.query.subscribe]));
                    console.log(result.subscribedNGO);
                    result.markModified('subscribedNGO');
                    result.save()
                        .then(respondWithResult(res))
                })
                .catch(handleError(res));
        } else if (req.query.unsubscribe) {
            User.findById(req.params.id)
                .then(function(result) {
                    _.pull(result.subscribedNGO, req.query.unsubscribe);
                    result.markModified('subscribedNGO');
                    result.save()
                        .then(respondWithResult(res))
                })
                .catch(handleError(res))
        } else
            respondWithResult(res, 200)({});
    } else
        respondWithResult(res, 200)({});
}

//To count the total number of users.
export function count1(req, res){
    User.find().count()
    .then(respondWithResult(res));
}
