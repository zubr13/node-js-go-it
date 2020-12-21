const users = require('../models/users');
const Joi = require('joi');
const NotFoundError = require('../errors/NotFoundError');

class UserController {
    getUsers(req, res) {
        res.json(users);
    }

    getUser = (req, res) => {
        const {
            params: { id },
        } = req;

        const userIndex = this.getUserIndex(id);

        res.json(users[userIndex]);
    };

    createUser(req, res) {
        const { body } = req;
        const newUser = {
            id: users.length + 1,
            ...body,
        };
        users.push(newUser);
        res.json(newUser);
    }

    validateUser(req, res, next) {
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
        const { id } = req.params;

        const userIndex = this.getUserIndex(id);
        console.log('userIndex', userIndex);

        const updatedUser = {
            ...users[userIndex],
            ...req.body,
        };

        users[userIndex] = updatedUser;

        res.json(updatedUser);
    };

    validateUpdateUser = (req, res, next) => {
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
    };

    getUserIndex(id) {
        const userId = parseInt(id);
        return users.findIndex(({ id }) => id === userId);
    }

    validateUserId = (req, res, next) => {
        const { id } = req.params;
        const userIndex = this.getUserIndex(id);

        if (userIndex === -1) {
            throw new NotFoundError();
            // return res.status(404).send('User is not found');
        }

        next();
    };

    deleteUser = (req, res) => {
        const { id } = req.params;
        const userIndex = this.getUserIndex(id);

        const deletedUser = users.splice(userIndex, 1);

        res.json(deletedUser);
    };
}

module.exports = new UserController();
