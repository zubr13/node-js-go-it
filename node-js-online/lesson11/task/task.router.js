const { Router } = require('express');
const TaskController = require('./task.controller');

const router = Router();

router.get('/', TaskController.getTasks);

module.exports = router;
