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
import User from '../user/user.model';
import Event from '../event/event.model';
import Org from '../organization/organization.model';




function respondWithResult(req, res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            for (var x = 0; x < entity.length; x++) {
        	var w=entity[x]["tags"];
        	var count = 0;
		for (var y = 0; y < req.body.tags.length; y++) {
			console.log(req.body.tags[y]);
			if (w.indexOf(req.body.tags[y]) > -1) {
				count = count + 1;
			}
		}
		entity[x].score= count;
		console.log("Printing count");
		console.log(entity[x]["score"]);
		console.log("**************8");
    		}
	    entity.sort( function(a,b) {
			return parseFloat(b.score) - parseFloat(a.score);
			});        
	    res.status(statusCode).json(entity);
	    
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
export function searchUser(req, res) {
    User.findAsync({'tags' : { $in : req.body.tags }})
        .then(handleEntityNotFound(res))
	.then(respondWithResult(req,res))
        .catch(handleError(res));
}

// Gets a single User from the DB
export function searchEvent(req, res) {
    Event.findAsync({'tags' : { $in : req.body.tags }})
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function searchNgo(req, res) {
    Org.findAsync({'tags' : { $in : req.body.tags }})
        .then(respondWithResult(res))
        .catch(handleError(res));
}

