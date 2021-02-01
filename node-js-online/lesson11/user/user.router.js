const { Router } = require('express');
const User = require('../../lesson6/user/User');
const UserController = require('./user.controller');

const router = Router();

router.get('/', UserController.authorize, UserController.getUsers);
router.get(
    '/:id',
    UserController.authorize,
    UserController.validateUserId,
    UserController.getUser
);
router.post(
    '/',
    UserController.authorize,
    UserController.validateUser,
    UserController.signUpUser
);
router.put('/:id', UserController.validateUserId, UserController.updateUser);
router.delete('/:id', UserController.validateUserId, UserController.deleteUser);
router.post('/:id/tasks', UserController.createTask);
router.delete('/:id/tasks/:taskId', UserController.deleteTask);
router.post('/login', UserController.validateLogin, UserController.login);
router.get('/verify/:token', UserController.verifyUser);

module.exports = router;
