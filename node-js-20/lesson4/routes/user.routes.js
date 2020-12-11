const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.validateCreateUser, UserController.createUser);
router.put(
    '/:id',
    UserController.validateUpdateUser,
    UserController.updateUser
);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
