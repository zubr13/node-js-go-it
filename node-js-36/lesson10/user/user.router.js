const { Router } = require('express');
const { route } = require('../../lesson4/routes/user.routes');
const User = require('./User');
const UserController = require('./user.controller');

const router = Router();

router.use(UserController.authorize);

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.post('/login', UserController.login);
router.get('/:id', UserController.validateId, UserController.getUser);
router.put('/:id', UserController.validateId, UserController.updateUser);
router.delete('/:id', UserController.validateId, UserController.deleteUser);

router.post(
    '/:id/tasks',
    UserController.validateId,
    UserController.createUserTask
);
router.delete('/:userId/tasks/:taskId', UserController.deleteUserTask);

module.exports = router;
