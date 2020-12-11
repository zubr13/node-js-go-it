const users = require('../models/users');
const Joi = require('joi');
const NotFoundError = require('../errors/NotFoundError');

class UserController {
    getUsers(req, res) {
        res.json(users);
    }

    getUser = (req, res) => {
        const userIndex = this.validateUserId(req, res);

        res.json(users[userIndex]);
    };

    createUser(req, res) {
        const createdUser = {
            ...req.body,
            id: users.length + 1,
        };

        users.push(createdUser);
        console.log('users', users);

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

    updateUser = (req, res) => {
        const userIndex = this.validateUserId(req, res);

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

    validateUserId(req, res) {
        const { id } = req.params;
        const userId = parseInt(id);

        const userIndex = users.findIndex(({ id }) => id === userId);

        if (userIndex === -1) {
            throw new NotFoundError();
        }

        return userIndex;
    }

    deleteUser = (req, res) => {
        const userIndex = this.validateUserId(req, res);
        const result = users.splice(userIndex, 1);
        res.json(result);
    };
}

module.exports = new UserController();
