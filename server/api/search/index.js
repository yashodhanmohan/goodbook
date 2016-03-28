'use strict';

var express = require('express');
var controller = require('./search.controller');

var router = express.Router();

router.post('/user/', controller.searchUser);
router.post('/event/', controller.searchEvent);
router.post('/ngo/', controller.searchNgo);

module.exports = router;
