const { Router } = require('express');
const { route } = require('../../lesson4/routes/user.routes');
const User = require('./User');
const UserController = require('./user.controller');

const router = Router();

router.get('/', UserController.authorize, UserController.getUsers);
router.post('/', UserController.signup);
router.post('/login', UserController.login);
router.get(
    '/:id',
    UserController.authorize,
    UserController.validateId,
    UserController.getUser
);
router.put(
    '/:id',
    UserController.authorize,
    UserController.validateId,
    UserController.updateUser
);
router.delete(
    '/:id',
    UserController.authorize,
    UserController.validateId,
    UserController.deleteUser
);

router.post(
    '/:id/tasks',
    UserController.validateId,
    UserController.createUserTask
);
router.delete('/:userId/tasks/:taskId', UserController.deleteUserTask);
router.get('/verify/:token', UserController.verifyUser);

module.exports = router;
