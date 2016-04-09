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




function changePassword(x) {
    var randomstring = Math.random().toString(36).slice(-8);

    console.log(x);
    User.findById(x._id, function(err, result) {
        result.password = randomstring;
        result.save();
    });
    changePasswordMail(x, randomstring);
    return x;


}


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







function welcomeMail(x) {
    var mailOptions = {
        from: '"Project Goodbook" <info@goodbook.com>', // sender address
        to: x.email, // list of receivers
        subject: 'Welcome to Project Goodbook', // Subject line
        text: 'Dear ' + x.name + ',\n\nWelcome to Project Goodbook. \nYour account will be verified by our team based on the documents that you have submitted. In case of any problems, we will get back to you.\n\nLet us work together to make this world a better place to live in.\nTeam Project Goodbook' // 
    };
    //transporter.sendMail(mailOptions,function(error, info){
    //if(error){
    //  return console.log(error);
    //}
    //console.log('Message sent: ' + info.response);
    //});
}


function tagData(x) {

    Organization.findById(x._id, function(err, result) {
        var tempTags = [result.username];
        tempTags.push(result.name);
        tempTags.push(result.email);
        var s = result.aboutUs.split(' ');
        tempTags = tempTags.concat(s);
        if (result.NGO) {
            tempTags.push("NGO");
        }
        if (result.CSR) {
            tempTags.push("CSR");
        }
        if (result.verified) {
            tempTags.push("verified");
        }
        result.tags = [];
        result.tags.push(tempTags);
        result.save();
    });
    return x;
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

function saveUpdates(updates) {
    return function(entity) {
        entity.subscribers = [];
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.removeAsync()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Organizations
export function index(req, res) {
    if (!_.isEmpty(req.query)) {
        Organization.findAsync(req.query)
            .then(respondWithResult(res))
            .catch(handleError(res));
    } else {
        respondWithResult(res, 403)({});
    }
}

// Gets a single Organization from the DB
export function show(req, res) {
    Organization.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Organization in the DB
export function create(req, res) {
    Organization.createAsync(req.body)
        .then(respondWithResult(res, 201))
        .then(tagData)
        .then(welcomeMail)
        .catch(handleError(res));
}

// Updates an existing Organization in the DB
export function update(req, res) {
    //if (req.body._id) {
    //  delete req.body._id;
    //}
    Organization.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .then(tagData)
        .catch(handleError(res));
}

// Deletes a Organization from the DB
export function destroy(req, res) {
    Organization.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

export function forgotPassword(req, res) {
    Organization.findOne({ username: req.body.username })
        .then(handleEntityNotFound(res))
        .then(changePassword)
        .then(respondWithResult(res))
        .catch(handleError(res))

}
