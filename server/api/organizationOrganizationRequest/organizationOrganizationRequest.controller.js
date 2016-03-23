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
import OrganizationOrganizationRequest from './organizationOrganizationRequest.model';

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

// Gets a list of OrganizationOrganizationRequests
export function index(req, res) {
    OrganizationOrganizationRequest.findAsync()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single OrganizationOrganizationRequest from the DB
export function show(req, res) {
    OrganizationOrganizationRequest.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new OrganizationOrganizationRequest in the DB
export function create(req, res) {
    OrganizationOrganizationRequest.createAsync(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing OrganizationOrganizationRequest in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    OrganizationOrganizationRequest.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a OrganizationOrganizationRequest from the DB
export function destroy(req, res) {
    OrganizationOrganizationRequest.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
