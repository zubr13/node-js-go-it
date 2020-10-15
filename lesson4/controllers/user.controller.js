const users = require('../models/users');
const Joi = require('joi');
const NotFoundError = require('../errors/NotFoundError');

class UserController {
    get deleteUser () {
        return this._deleteUser.bind(this);
    }

    getUsers (req, res) {
        res.json(users);
    }

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

    updateUser(req, res) {
        const { id } = req.params;
        const userId = +id;

        this.validateParam(userId);

        const updatedUser = {
            ...users[userIndex],
            ...req.body,
        };
        users[userIndex] = updatedUser;
        console.log('users', users);
        res.json(updatedUser);
    }

    _deleteUser (req, res) {
        const { id } = req.params;
        const userId = parseInt(id);

        const userIndex = this.validateParam(userId);

        users.splice(userIndex, 1);
        
        console.log('users', users);

        res.json(`Deleted id: ${id}`);
    }

    findUserIndex (userId) {
        return users.findIndex(({ id }) => id === userId);
    }

    validateParam (param) {
        const userIndex = this.findUserIndex(param);

        if (userIndex === -1) {
            throw new NotFoundError();
        }

        return userIndex;
    }
}

module.exports = new UserController();