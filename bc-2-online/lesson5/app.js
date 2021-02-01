const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');
const express = require('express');
const Joi = require('joi');

dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const PORT = process.env.PORT || 8080;

const MONGO_URL = `mongodb+srv://admin:${DB_PASSWORD}@cluster0.pv7re.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());
let users;

start();

app.get('/users', getUsers);
app.post('/users', validateCreateUser, createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT);
});

async function start() {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();

    users = db.collection('users');
}

async function getUsers(req, res) {
    const data = await users.find().toArray();
    res.json(data);
}

async function createUser(req, res) {
    const { body } = req;
    const data = await users.insertOne(body);
    res.json(data.ops[0]);
}

function validateCreateUser(req, res, next) {
    const validationRules = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    const result = validationRules.validate(req.body);

    if (result.error) {
        return res.status(400).send(result.error);
    }

    next();
}

async function updateUser(req, res) {
    const {
        params: { id },
    } = req;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Your id is not valid');
    }

    const updatedUser = await users.updateOne(
        {
            _id: ObjectID(id),
        },
        {
            $set: req.body,
        }
    );

    if (!updatedUser.modifiedCount) {
        return res.status(400).send("User isn't found");
    }

    res.json(updatedUser);
}

async function deleteUser(req, res) {
    const {
        params: { id },
    } = req;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Your id is not valid');
    }

    const deletedUser = await users.deleteOne({
        _id: ObjectID(id),
    });

    if (!updatedUser.deletedCount) {
        return res.status(400).send("User isn't found");
    }

    res.json(deletedUser);
}
