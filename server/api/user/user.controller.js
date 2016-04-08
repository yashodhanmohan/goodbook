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



function changePassword(x){
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
	    text: 'Dear ' + x.firstName + ' ' + x.lastName +',\n\nAs per your request your password has been changed. The new password is:' + y + '\n\nIf you had not requested this change, please let us know by replying to this mail.\n\nTrying to make a difference,\nTeam Project Goodbook' // 
	};
	transporter.sendMail(mailOptions,function(error, info){
    	if(error){
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
	    text: 'Dear ' + x.firstName + ' ' + x.lastName +',\n\nWelcome to Project Goodbook. Let us work together to make this world a better place to live in.\n\nTeam Project Goodbook' // 
	};
	//transporter.sendMail(mailOptions,function(error, info){
    	//if(error){
        //	return console.log(error);
    	//}
    	//console.log('Message sent: ' + info.response);
	//});
}

function tagData(x) {
	console.log(x);
	User.findById(x._id, function(err, result) {
		var tempTags = [result.username];
		tempTags.push(result.firstName);
		tempTags.push(result.lastName);
		tempTags.push(result.email);
		tempTags.push(result.gender);
		tempTags = tempTags.concat(result.subscribedNGO);
		tempTags = tempTags.concat(result.interests);
		result.tags = [];
		result.tags.push(tempTags);
		result.save();
	});
	return x;
}


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


function registerCheck(req, res, statusCode) {
	return function(entity) {
		statusCode = statusCode || 200;
		if (entity) {
			res.status(302).end();
			return null;
		} else {
			User.createAsync(tagData(req.body));
			res.status(statusCode).json(entity);
		}
	};
}


function respondWithResult(res, statusCode) {
	statusCode = statusCode || 200;
	return function(entity) {
		if (entity) {
			res.status(statusCode).json(entity);
			//console.log(entity);
			return entity;
		}
	};
}

function saveUpdates(updates) {
	return function(entity) {
		entity.subscribedNGO = [];
		entity.interests = [];
		entity.tags = [];
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
		console.log(entity);
		return entity;
	};
}


function handleError(res, statusCode) {
	statusCode = statusCode || 500;
	return function(err) {
		res.status(statusCode).send(err);
	};
}

// Gets a list of Users
export function index(req, res) {
	User.findAsync()
		.then(respondWithResult(res))
		.catch(handleError(res));
}


// Gets a single User from the DB
export function showUname(req, res) {
	User.findOne({ username: req.params.uname })
		.then(handleEntityNotFound(res))
		.then(respondWithResult(res))
		.catch(handleError(res));
}
// Gets a single User from the DB
export function show(req, res) {
	User.findByIdAsync(req.params.id)
		.then(handleEntityNotFound(res))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Creates a new User in the DB
export function create(req, res) {
	User.createAsync(req.body)
		.then(respondWithResult(res, 201))
		.then(tagData)
		.then(welcomeMail)
		.catch(handleError(res));
}


//To check for login
export function login(req, res) {
	User.findOne({ username: req.body.username })
		.then(checkPassword(req, res))
		.catch(handleError(res));
}

export function register(req, res) {
	User.findOne({ username: req.body.username })
		.then(registerCheck(req, res))
		.catch(handleError(res));
}



// Updates an existing User in the DB
export function update(req, res) {
	//if (req.body._id) {
	//	delete req.body._id;
	//}
	User.findByIdAsync(req.params.id)
		.then(handleEntityNotFound(res))
		.then(saveUpdates(req.body))
		.then(respondWithResult(res))
		.then(tagData)
		.catch(handleError(res));
}

// Deletes a User from the DB
export function destroy(req, res) {
	User.findByIdAsync(req.params.id)
		.then(handleEntityNotFound(res))
		.then(removeEntity(res))
		.catch(handleError(res));
}

export function forgotPassword(req, res) {
	User.findOne({ username: req.body.username})
		.then(handleEntityNotFound(res))
		.then(changePassword)
		.then(respondWithResult(res))
		.catch(handleError(res))
	
}
