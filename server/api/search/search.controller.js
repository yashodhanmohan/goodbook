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



//Thisfunction responds with results.
function respondWithResult(req, res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            for (var x = 0; x < entity.length; x++) {
                var w = entity[x]["tags"];
                var count = 0;
                for (var y = 0; y < req.body.tags.length; y++) {
                    if (w.indexOf(req.body.tags[y]) > -1) {
                        count = count + 1;
                    }
                }
                entity[x].score = count;
            }
            entity.sort(function(a, b) {
                return parseFloat(b.score) - parseFloat(a.score);
            });
            res.status(statusCode).json(entity);

        }

    };
}


//To handle the case when no entity is found.
function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

//To handle other errors.
function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}




// Search the users db for relevant users
//with tags specified
export function searchUser(req, res) {
    User.findAsync({ 'tags': { $in: req.body.tags } })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(req, res))
        .catch(handleError(res));
}

// Search Events db with relevant tags specified
export function searchEvent(req, res) {
    Event.findAsync({ 'tags': { $in: req.body.tags } })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

//Search for NGO with relevant tags
export function searchNgo(req, res) {
    Org.findAsync({ 'tags': { $in: req.body.tags } })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}
