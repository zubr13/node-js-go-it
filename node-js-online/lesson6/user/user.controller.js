const {
    Types: { ObjectId },
} = require('mongoose');
const Joi = require('joi');

const User = require('./User');

async function getUsers(req, res) {
    const data = await User.find();
    res.json(data);
}

function validateUserId(req, res, next) {
    const {
        params: { id },
    } = req;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Id is not valid');
    }

    next();
}

async function getUser(req, res) {
    const {
        params: { id },
    } = req;

    const data = await User.findById(id);

    if (!data) {
        return res.status(404).send('User is not found');
    }

    res.json(data);
}

function validateUser(req, res, next) {
    console.log('body', req.body);
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

async function createUser(req, res) {
    try {
        const data = await User.create(req.body);
        res.json(data);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('Email is duplicated');
        }
    }
}

async function updateUser(req, res) {
    const {
        params: { id },
    } = req;

    const result = await User.findByIdAndUpdate(
        id,
        {
            $set: req.body,
        },
        {
            new: true,
        }
    );

    if (!result) {
        return res.status(404).send('User is not found');
    }

    res.json(result);
}

async function deleteUser(req, res) {
    const {
        params: { id },
    } = req;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
        return res.status(404).send('User is not found');
    }

    res.json(result);
}

async function createTask(req, res) {
    const {
        params: { id },
    } = req;

    const user = await User.findByIdAndUpdate(
        id,
        {
            $push: {
                tasks: req.body,
            },
        },
        {
            new: true,
        }
    );

    res.json(user);
}

async function deleteTask(req, res) {
    const {
        params: { id, taskId },
    } = req;

    const user = await User.findByIdAndUpdate(
        id,
        {
            $pull: {
                tasks: {
                    _id: taskId,
                },
            },
        },
        {
            new: true,
        }
    );

    res.json(user);
}

module.exports = {
    getUsers,
    createUser,
    validateUserId,
    getUser,
    validateUser,
    updateUser,
    deleteUser,
    createTask,
    deleteTask,
};
