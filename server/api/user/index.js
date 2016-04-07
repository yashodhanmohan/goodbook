'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/u/:uname', controller.showUname);
router.get('/:id', controller.show);
router.get('/', controller.index);
router.post('/forgotpassword/', controller.forgotPassword);
router.post('/login/', controller.login);
router.post('/register/', controller.register);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
