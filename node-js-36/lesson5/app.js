const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');
const Joi = require('joi');
const { restart } = require('nodemon');
const { validateUserId } = require('../lesson4/controllers/user.controller');

dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT || 8080;

const MONGO_URL = `mongodb+srv://admin:${DB_PASSWORD}@cluster0.tu8lv.mongodb.net/test?retryWrites=true&w=majority`;
let usersCollection;

async function start() {
    const app = express();
    app.use(express.json());

    app.listen(PORT, () => {
        console.log('Server is listening on port: ', PORT);
    });

    const client = await MongoClient.connect(MONGO_URL);

    const db = client.db();
    usersCollection = db.collection('users');

    app.get('/users', getUsers);
    app.post('/users', validateCreateUser, createUser);
    app.get('/users/:id', validateId, getUser);
    app.put('/users/:id', validateId, validateUpdateUser, updateUser);
    app.delete('/users/:id', validateId, deleteUser);
}

start();

async function getUsers(req, res) {
    const users = await usersCollection.find().toArray();
    res.json(users);
}

async function createUser(req, res) {
    const result = await usersCollection.insertOne(req.body);
    res.json(result.ops[0]);
}

function validateCreateUser(req, res, next) {
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

async function getUser(req, res) {
    const {
        params: { id },
    } = req;

    const user = await usersCollection.findOne({
        _id: ObjectID(id),
    });

    if (!user) {
        return res.status(404).send("User isn't found");
    }

    res.json(user);
}

async function updateUser(req, res) {
    const {
        params: { id },
    } = req;

    const result = await usersCollection.updateOne(
        {
            _id: ObjectID(id),
        },
        { $set: req.body }
    );

    if (!result.modifiedCount) {
        return res.status(404).send('User is not found');
    }

    res.json(result);
}

function validateUpdateUser(req, res, next) {
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

async function deleteUser(req, res) {
    const {
        params: { id },
    } = req;

    const result = await usersCollection.deleteOne({
        _id: ObjectID(id),
    });

    if (!result.deletedCount) {
        return res.status(404).send('User is not found');
    }

    res.json(result);
}

function validateId(req, res, next) {
    const {
        params: { id },
    } = req;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('User id is not valid');
    }

    next();
}
