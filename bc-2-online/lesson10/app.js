const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRouter = require('./user/user.routes');
const taskRouter = require('./task/task.routes');

dotenv.config();

mongoose.set('debug', true);

// 1. Init express server
// 2. Connect middlewares
// 3. Declare routes
// 4. Connect to db
// 5. Listen on port

const PORT = process.env.PORT || 8080;

let app;

start();

function start() {
  app = initServer();
  connectMiddlewares(app);
  declareRoutes(app);
  connectToDb();
  listen(app);
}

function initServer() {
  return express();
}

function connectMiddlewares(app) {
  app.use(express.json());
  app.use(morgan('combined'));
}

function declareRoutes(app) {
  app.use('/users', userRouter);
  app.use('/tasks', taskRouter);
}

async function connectToDb() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function listen(app) {
  app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
  });
}

module.exports = app;
