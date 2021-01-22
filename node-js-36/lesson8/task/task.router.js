const { Router } = require('express');
const TaskController = require('./task.controller');

const router = Router();

router.get('/', TaskController.getTasks);
router.post('/', TaskController.createTask);

module.exports = router;
