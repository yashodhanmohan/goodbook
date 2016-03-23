/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/v1/things', require('./api/thing'));
  app.use('/api/v1/users', require('./api/user'));
  app.use('/api/v1/organizations', require('./api/organization'));
  app.use('/api/v1/organizationOrganizationRequests', require('./api/organizationOrganizationRequest'));
  app.use('/api/v1/transactions', require('./api/transaction'));
  app.use('/api/v1/events', require('./api/event'));
  app.use('/api/v1/gallerys', require('./api/gallery'));
  app.use('/api/v1/notifications', require('./api/notification'));
  app.use('/api/v1/oneTimeTransactions', require('./api/oneTimeTransaction'));
  app.use('/api/v1/querys', require('./api/query'));
  app.use('/api/v1/eventRequests', require('./api/eventRequest'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
