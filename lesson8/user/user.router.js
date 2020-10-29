const { Router } = require("express");
const UserController = require('./user.controller');

const router = Router();

router.post("/login", UserController.validateLogin, UserController.login);
router.get('/', UserController.getUsers);
router.get("/:id", UserController.validateId, UserController.getUserById);
router.post('/', UserController.validateCreateUser, UserController.authorize, UserController.createUser);
router.put("/:id", UserController.validateUpdateUser, UserController.authorize, UserController.validateId, UserController.updateUser);
router.delete("/:id", UserController.validateId, UserController.authorize, UserController.deleteUser);
router.post("/:id/tasks", UserController.authorize, UserController.createTask);
router.delete("/:id/tasks/:taskId", UserController.authorize, UserController.deleteTask);

module.exports = router;