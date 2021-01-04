const dotenv = require('dotenv');
const { MongoClient, ObjectID } = require('mongodb');
const express = require('express');
const Joi = require('joi');
const morgan = require('morgan');

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const MONGO_URL = `mongodb+srv://admin:${DB_PASSWORD}@cluster0.mxcu3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 8080;

let users;

async function start() {
    const client = await MongoClient.connect(MONGO_URL);

    const db = client.db('test');

    users = db.collection('users');
    // const result = await users.find().toArray();

    const server = express();
    server.use(express.json());
    server.use(morgan());

    server.get('/users', getUsers);
    server.get('/users/:id', validateUserId, getUser);
    server.post('/users', validateUser, createUser);
    server.put('/users/:id', validateUserId, updateUser);
    server.delete('/users/:id', validateUserId, deleteUser);

    server.listen(PORT, () => {
        console.log('Server is listening on port: ', PORT);
    });
}

async function getUsers(req, res) {
    const data = await users.find().toArray();
    res.json(data);
}

async function getUser(req, res) {
    const {
        params: { id },
    } = req;

    const data = await users.findOne({
        _id: ObjectID(id),
    });

    res.json(data);
}

async function createUser(req, res) {
    const data = await users.insertOne(req.body);
    res.json(data);
}

function validateUser(req, res, next) {
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

function validateUserId(req, res, next) {
    const {
        params: { id },
    } = req;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Id is not valid');
    }

    next();
}

async function updateUser(req, res) {
    const {
        params: { id },
    } = req;

    const result = await users.updateOne(
        {
            _id: ObjectID(id),
        },
        {
            $set: req.body,
        }
    );

    if (!result.modifiedCount) {
        return res.status(404).send('User is not found');
    }

    res.json(result);
}

async function deleteUser(req, res) {
    const {
        params: { id },
    } = req;

    const result = await users.deleteOne({
        _id: ObjectID(id),
    });

    if (!result.deletedCount) {
        return res.status(404).send('User is not found');
    }

    res.json(result);
}

start();
