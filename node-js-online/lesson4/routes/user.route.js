const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.validateUserId, UserController.getUser);
router.post('/', UserController.validateUser, UserController.createUser);
router.put(
    '/:id',
    UserController.validateUserId,
    UserController.validateUpdateUser,
    UserController.updateUser
);
router.delete('/:id', UserController.validateUserId, UserController.deleteUser);

module.exports = router;
