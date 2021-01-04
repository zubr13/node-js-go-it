const { Router } = require('express');
const UserController = require('./user.controller');

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.validateUserId, UserController.getUser);
router.post('/', UserController.validateUser, UserController.createUser);
router.put('/:id', UserController.validateUserId, UserController.updateUser);
router.delete('/:id', UserController.validateUserId, UserController.deleteUser);
router.post('/:id/tasks', UserController.createTask);
router.delete('/:id/tasks/:taskId', UserController.deleteTask);

module.exports = router;
