/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  update
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import User from './user.model';



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
        }
	else {
		res.status(301).end();
		return null;
	}
	
    };
}


function registerCheck(req, res, statusCode) {
    return function(entity) {
		statusCode = statusCode || 200;
		if(entity){
            res.status(302).end();
            return null;
		}
		else{
			User.createAsync(req.body);
	    	res.status(statusCode).json(entity);
		}
	};
}


function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function(entity) {
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

// Gets a list of Users
export function index(req, res) {
    User.findAsync()
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Gets a single User from the DB
export function showUname(req, res) {
    User.findOne({username: req.params.uname})
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
        .catch(handleError(res));
}


//To check for login
export function login(req, res) {
    User.findOne({username:req.body.username})
	.then(checkPassword(req,res))
	.catch(handleError(res));
}

export function register(req, res) {
    User.findOne({username:req.body.username})
	.then(registerCheck(req,res))
    .catch(handleError(res));
}



// Updates an existing User in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    User.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a User from the DB
export function destroy(req, res) {
    User.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
