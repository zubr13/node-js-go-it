const Joi = require('joi');
const User = require('./User');
const Task = require('../task/Task');
const {
    Types: { ObjectId },
} = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getUsers(req, res) {
    const users = await User.aggregate([
        {
            $lookup: {
                from: 'tasks',
                localField: 'tasksIds',
                foreignField: '_id',
                as: 'tasks',
            },
        },
    ]);
    res.json(users);
}

async function createUser(req, res) {
    try {
        const {
            body: { password },
        } = req;
        const hash = await bcryptjs.hash(password, 10);
        const user = await User.create({
            ...req.body,
            password: hash,
        });
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getUser(req, res) {
    const {
        params: { id },
    } = req;

    const user = await User.findById(id).populate('tasksIds');

    if (!user) {
        return res.status(404).send("User isn't found");
    }

    res.json(user);
}

function validateId(req, res, next) {
    const {
        params: { id },
    } = req;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send('User id is not valid');
    }

    next();
}

async function updateUser(req, res) {
    const {
        params: { id },
    } = req;

    const user = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        {
            new: true,
        }
    );

    if (!user) {
        return res.status(404).send('User is not found');
    }

    res.json(user);
}

async function deleteUser(req, res) {
    const {
        params: { id },
    } = req;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).send('User is not found');
    }

    res.json(user);
}

async function createUserTask(req, res) {
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
        { new: true }
    );
    res.json(user);
}

async function deleteUserTask(req, res) {
    const {
        params: { userId, taskId },
    } = req;

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $pull: {
                tasks: { _id: taskId },
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
        return res.status(401).send('Authentication is failed');
    }
    const result = await bcryptjs.compare(password, user.password);

    if (!result) {
        return res.status(401).send('Authentication is failed');
    }

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token });
}

async function authorize(req, res, next) {
    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) {
        return res.status(401).send('User is not authorized');
    }
    const token = authorizationHeader.replace('Bearer ', '');

    try {
        const { userId } = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send('User is not authorized');
    }
}

module.exports = {
    getUsers,
    createUser,
    getUser,
    validateId,
    updateUser,
    deleteUser,
    createUserTask,
    deleteUserTask,
    login,
    authorize,
};
