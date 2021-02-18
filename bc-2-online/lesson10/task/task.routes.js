const { Router } = require('express');
const TaskController = require('./task.controller');
const UserController = require('../user/user.controller');

const router = Router();

router.get('/', UserController.authorize, TaskController.getTasks);

module.exports = router;
