const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.validateCreateUser, UserController.createUser);
router.put(
    '/:id',
    UserController.validateUserId,
    UserController.validateUpdateUser,
    UserController.updateUser
);
router.delete('/:id', UserController.validateUserId, UserController.deleteUser);

module.exports = router;
