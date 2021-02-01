const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

const userRouter = require('./user/user.router');
const taskRouter = require('./task/task.router');
const projectRouter = require('./project/project.router');

dotenv.config();
mongoose.set('debug', true);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// 1. Init express server
// 2. Declare routes
// 3. Connect middlewares
// 4. Connect database
// 5. Listen for express server

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT || 8080;
const MONGO_URL = `mongodb+srv://admin:${DB_PASSWORD}@cluster0.mxcu3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
let server;

start();

function start() {
    initServer();
    initMiddlewares();
    declareRoutes();
    connectDatabase();
    listen();
}

function initServer() {
    server = express();
}

function initMiddlewares() {
    server.use(express.json());
}

function declareRoutes() {
    server.use('/users', userRouter);
    server.use('/tasks', taskRouter);
    server.use('/projects', projectRouter);
}

async function connectDatabase() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

function listen() {
    server.listen(PORT, () => {
        console.log('Server is listening on port: ', PORT);
    });
}
