const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.validateCreateUser, UserController.createUser);
router.put('/:id', UserController.updateUser);
// router.get('/:id/posts/:id/comments/:id')
router.delete('/:id', UserController.deleteUser);

module.exports = router;