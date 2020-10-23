const { Router } = require("express");
const UserController = require('./user.controller');

const router = Router();

router.get('/', UserController.getUsers);
router.get("/:id", UserController.validateId, UserController.getUserById);
router.post('/', UserController.validateCreateUser, UserController.createUser);
router.put("/:id", UserController.validateUpdateUser, UserController.validateId, UserController.updateUser);
router.delete("/:id", UserController.validateId, UserController.deleteUser);
router.post("/:id/tasks", UserController.createTask);
router.delete("/:id/tasks/:taskId", UserController.deleteTask);

module.exports = router;