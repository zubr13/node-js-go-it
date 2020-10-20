const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const dotenv = require("dotenv");
const Joi = require('joi');

dotenv.config();

const MONGO_URL = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.qsl0a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 8000;
let usersCollection;

start();

async function start () {
    const app = express();
    app.use(express.json());

    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();
    usersCollection = db.collection('users');

    app.get('/users', async (req, res) => {
        const users = await usersCollection.find().toArray();

        res.json(users);
    });

    app.post('/users', validateCreateUser, createUser);

    app.get("/users/:id", getUserById);

    app.put("/users/:id", validateUpdateUser, updateUser);

    app.delete("/users/:id", deleteUser);


    app.listen(PORT, () => {
        console.log("Server is listening on port: ", PORT);
    });

}

async function createUser (req, res) {
    const result = await usersCollection.insertOne(req.body);
    console.log(result);
    res.status(201).json(result.ops[0]);
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

async function getUserById(req, res) {
    const { params: { id } } = req;

    if (!ObjectID.isValid(id)) {
        return res.status(404).json({ message: "Id is not valid" });
    }

    const user = await usersCollection.findOne({
        _id: ObjectID(id),
    });

    if(!user) {
        return res.status(404).json({ message: "User is not found"});
    }

    res.json(user);
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

    if (!ObjectID.isValid(id)) {
        return res.status(404).json({ message: "Id is not valid" });
    }

    const result = await usersCollection.updateOne({
        _id: ObjectID(id)
    }, {
        $set: {req.body},
    });

    if (!result.modifiedCount) {
        return res.status(404).json({ message: "User is not found"});
    }

    res.json(result);
}

async function deleteUser(req, res) {
    const { params: { id }} = req;

    const result = await usersCollection.deleteOne({
        _id: ObjectID(id),
    });

    res.status(204).send();
}