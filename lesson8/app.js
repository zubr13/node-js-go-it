const mongoose = require("mongoose");
const dotenv= require('dotenv');
const express = require("express");
const userRouter = require("./user/user.router");
const taskRouter = require("./task/task.router");

dotenv.config();

let app;
const PORT = process.env.PORT || 7000;

// 1. Init express
// 2. Connect middleware
// 3. Connect to db
// 4. Declare routes
// 5. Listen on port

start();
mongoose.set('debug', true)

async function start() {
    initExpress();
    initMiddleware();
    await connectDb();
    initRoutes();
    listen();
}

function initExpress() {
    app = express();
}

function initMiddleware() {
    app.use(express.json());
}

async function connectDb() {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
}

function initRoutes() {
    app.use('/users', userRouter);
    app.use('/tasks', taskRouter);
}

function listen() {
    app.listen(PORT, () => console.log("Server is listening on port", PORT));
}

