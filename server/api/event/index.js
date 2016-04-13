'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

router.get('/count', controller.count1);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id/volunteer', controller.volunteer);
router.post('/search', controller.search);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
