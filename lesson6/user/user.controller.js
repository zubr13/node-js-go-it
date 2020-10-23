const User = require('./User');
const Joi = require('joi');
const { Types: { ObjectId }} = require('mongoose');

async function getUsers(req, res) {
    const users = await User.find();
    res.json(users);
}

function validateCreateUser (req, res, next) {
    const validationSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    const validationResult = validationSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).send(validationResult.error);
    }

    next();
}

async function createUser (req, res) {
    const user = await User.create(req.body);
    res.status(201).json(user);
}

function validateUpdateUser (req, res, next) {
    const validationSchema = Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
    });

    const validationResult = validationSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).send(validationResult.error);
    }

    next();
}

async function updateUser(req, res) {
    const { params: { id }} = req;

    const user = await User.findByIdAndUpdate(id, {
        $set: req.body,
    });

    if (!user) {
        return res.status(404).json({ message: "User is not found"});
    }

    res.json(user);
}

function validateId(req, res, next) {
    const { params: { id }} = req;

    if (!ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Id is not valid" });
    }

    next();
}

async function getUserById(req, res) {
    const { params: { id } } = req;

    const user = await User.findById(id);

    if(!user) {
        return res.status(404).json({ message: "User is not found"});
    }

    res.json(user);
}

async function deleteUser(req, res) {
    const { params: { id }} = req;

    const user = await User.findByIdAndDelete(id);

    if(!user) {
        return res.status(404).json({ message: "User is not found"});
    }

    res.status(204).send(user);
}

async function createTask(req, res) {
    const task = await User.update({
        $push: {
            tasks: req.body,
        }
    });
    res.status(201).json(task);
}

async function deleteTask(req, res) {
    const { params: { taskId }} = req;

    const task = await User.update({
        $pull: {
            tasks: {
                _id: taskId,
            },
        }
    });
    
    res.status(200).json(task);
}

module.exports = {
    getUsers,
    validateCreateUser,
    createUser,
    validateUpdateUser,
    updateUser,
    validateId,
    getUserById,
    deleteUser,
    createTask,
    deleteTask,
};