const users = require('../models/users');
const Joi = require('joi');
const NotFoundError = require('../errors/NotFoundError');

class UserController {
    getUsers(req, res) {
        res.json(users);
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

    createUser(req, res) {
        const newUser = {
            id: users.length + 1,
            ...req.body,
        };
        users.push(newUser);
        res.json(newUser);
    }

    updateUser = (req, res) => {
        const {
            params: { id },
        } = req;

        const userIndex = this.getUserIndex(id);

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

    validateUserId = (req, res, next) => {
        const {
            params: { id },
        } = req;

        const userIndex = this.getUserIndex(id);

        if (userIndex === -1) {
            throw new NotFoundError();
            // return res.status(404).send('User is not found');
        }

        next();
    };

    getUserIndex(id) {
        const userId = parseInt(id);
        return users.findIndex(({ id }) => id === userId);
    }

    deleteUser = (req, res) => {
        const {
            params: { id },
        } = req;

        const userIndex = this.getUserIndex(id);
        const deletedUser = users.splice(userIndex, 1);

        res.json(deletedUser);
    };
}

module.exports = new UserController();
