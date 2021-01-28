const users = require('../models/User');
const Joi = require('joi');

class UserController {
    getUsers(req, res) {
        res.json(users);
    }

    createUser(req, res) {
        const { body } = req;

        const createdUser = {
            ...body,
            id: users.length + 1,
        };

        users.push(createdUser);

        res.json(createdUser);
    }

    validateCreateUser(req, res, next) {
        const validationRules = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        });

        const validationResult = validationRules.validate(req.body);

        if (validationResult.error) {
            return res.status(400).send(validationResult.error);
        }

        next();
    }

    findUserIndex = (id) => {
        const userId = +id;
        return users.findIndex(({ id }) => id === userId);
    };

    updateUser = (req, res) => {
        const {
            params: { id },
        } = req;

        const userIndex = this.findUserIndex(id);

        const updatedUser = {
            ...users[userIndex],
            ...req.body,
        };

        users[userIndex] = updatedUser;

        res.json(updatedUser);
    };

    validateUpdateUser(req, res, next) {
        const validationRules = Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            password: Joi.string(),
        });

        const validationResult = validationRules.validate(req.body);

        if (validationResult.error) {
            return res.status(400).send(validationResult.error);
        }

        next();
    }

    deleteUser = (req, res) => {
        const {
            params: { id },
        } = req;

        const userIndex = this.findUserIndex(id);

        const deletedUser = users.splice(userIndex, 1);

        res.json(deletedUser);
    };

    validateUserId(req, res, next) {
        const {
            params: { id },
        } = req;
        const userId = +id;

        const userIndex = users.findIndex(({ id }) => id === userId);

        if (userIndex === -1) {
            return res.status(400).send('User is not found');
        }

        next();
    }
}

module.exports = new UserController();
