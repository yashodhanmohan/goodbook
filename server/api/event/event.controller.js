/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Events              ->  index
 * POST    /api/Events              ->  create
 * GET     /api/Events/:id          ->  show
 * PUT     /api/Events/:id          ->  update
 * DELETE  /api/Events/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Event from './event.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function tagData(x) {
    var tempTags = [];
    tempTags.push(x.name.toLowerCase());
    x.tags = [];
    x.tags = x.tags.concat(tempTags);
    Event.update({ _id: x._id }, {
        $set: {
            tags: x.tags
        }
    }, function(err, result) {
        return result;
    });
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

// Gets a list of Events
export function index(req, res) {
    if (!_.isEmpty(req.query)) {
        if(req.query.organization) {
            Event.findAsync({
                organizations: {
                    $in: req.query.organization
                }
            })
            .then(respondWithResult(res))
            .catch(handleError(res));
        }
        else if(req.query.volunteer){
            Event.findAsync({
                volunteers: {
                    $in: req.query.volunteer
                }
            })
            .then(respondWithResult(res))
            .catch(handleError(res));
        }
        
    }
}

// Gets a single Event from the DB
export function show(req, res) {
    Event.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Event in the DB
export function create(req, res) {
    Event.createAsync(req.body)
        .then(respondWithResult(res, 201))
        .then(tagData)
        .catch(handleError(res));
}

// Updates an existing Event in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Event.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .then(tagData)
        .catch(handleError(res));
}

// Deletes a Event from the Database
export function destroy(req, res) {
    Event.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

export function search(req, res) {
    var temp = req.body.query.split(" ");
    var search_terms = [];
    search_terms = search_terms.concat(temp);
    for (var s in temp) {
        search_terms.push(temp[s].toLowerCase());
    }
    Event.findAsync({
            tags: {
                $in: search_terms
            }
        })
        .then(respondWithResult(res))
        .catch(handleError);
}
