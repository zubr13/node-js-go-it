const User = require('./User');
const Joi = require('joi');
const { Types: { ObjectId }} = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Task = require('../task/Task');

async function getUsers(req, res) {
    const users = await User.find().populate("tasksIds");
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
    const { body: { password } } = req;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
        ...req.body,
        password: hashedPassword,
    });
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

    const user = await User.aggregate([{
        $lookup: [{
            from: "tasks",
            localField: "tasksIds",
            foreignField: "_id",
            as: 'tasks'
        }]
    }]);

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
    const task = await Task.create(req.body);
    console.log('task', task);
    const user = await User.update({
        $push: {
            tasksIds: task._id,
        }
    });
    res.status(201).json(user);
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

async function login(req, res) {
    const { body: {email, password} } = req;

    const user = await User.findOne({
        email,
    });

    if(!user) {
        return res.status(401).send("Authorization failed");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(401).send("Authorization failed");
    }

    console.log('user id', user._id);
    const token = await jwt.sign({
        userId: user._id 
    }, process.env.JWT_SECRET, {
        expiresIn: 2 * 24 * 60 * 60,
    });

    res.json({ token });
}

validateLogin(req, res, next);

function validateLogin(req, res, next) {
    const validationSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    const validationResult = validationSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).send(validationResult.error);
    }

    next();
}

async function authorize(req, res, next) {
    const authorizationHeader = req.get("Authorization");
    if(!authorizationHeader) {
        res.status(403).send("Authorization is failed");
    }
    const token = authorizationHeader.replace("Bearer ", "");

    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
    } catch (err) {
        res.status(403).send("Authorization is failed");
    }

    next();
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
    validateLogin,
    login,
    authorize,
};