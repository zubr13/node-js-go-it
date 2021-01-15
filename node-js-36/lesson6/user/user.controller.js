const Joi = require('joi');
const User = require('./User');
const {
    Types: { ObjectId },
} = require('mongoose');

async function getUsers(req, res) {
    const users = await User.find();
    res.json(users);
}

async function createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getUser(req, res) {
    const {
        params: { id },
    } = req;

    const user = await User.findById(id);

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

    const user = await User.findByIdAndUpdate(
        id,
        {
            $push: {
                tasks: req.body,
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

module.exports = {
    getUsers,
    createUser,
    getUser,
    validateId,
    updateUser,
    deleteUser,
    createUserTask,
    deleteUserTask,
};
