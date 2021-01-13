const {
    Types: { ObjectId },
} = require('mongoose');
const Joi = require('joi');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./User');
const Task = require('../task/Task');

async function getUsers(req, res) {
    const data = await User.aggregate([
        {
            $lookup: {
                from: 'tasks',
                localField: 'tasksIds',
                foreignField: '_id',
                as: 'tasks',
            },
        },
    ]);
    res.json(data);
}

async function sortUsers(req, res) {
    const data = await User.aggregate([
        {
            $sort: {
                name: 1,
            },
        },
    ]);
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

    const data = await User.findById(id)
        .populate('tasksIds')
        .populate('projectIds');

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
        const {
            body: { password },
        } = req;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const data = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        res.json(data);
    } catch (error) {
        console.log('error', error);
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

    const task = await Task.create(req.body);

    const user = await User.findByIdAndUpdate(
        id,
        {
            $push: {
                tasksIds: task._id,
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

async function login(req, res) {
    const {
        body: { email, password },
    } = req;

    const user = await User.findOne({
        email,
    });

    if (!user) {
        return res.status(401).send('Authentication error');
    }

    const passwordCheckResult = await bcryptjs.compare(password, user.password);

    if (!passwordCheckResult) {
        return res.status(401).send('Authentication error');
    }

    const token = await jwt.sign(
        {
            userId: user._id,
        },
        process.env.JWT_SECRET
    );

    res.send({ token });
}

function validateLogin(req, res, next) {
    const validationRules = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    const validationResult = validationRules.validate(req.body);

    if (validationResult.error) {
        return res.status(400).send(validationResult.error);
    }

    next();
}

async function authorize(req, res, next) {
    try {
        const authorizationHeader = req.get('Authorization');
        const token = authorizationHeader.replace('Bearer ', '');
        const { userId } = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(userId);
        req.user = user;
        next();
    } catch (error) {
        console.log('error', error);
        return res.status(403).send('Authorization error');
    }
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
    login,
    validateLogin,
    authorize,
};
