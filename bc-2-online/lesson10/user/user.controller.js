const {
  Types: { ObjectId },
} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./User');
const Task = require('../task/Task');

async function getUsers(req, res) {
  const currentUser = req.user;
  console.log('currentUser', currentUser);

  const users = await User.aggregate([
    {
      $lookup: {
        from: 'tasks',
        localField: 'taskIds',
        foreignField: '_id',
        as: 'tasks',
      },
    },
  ]);
  res.json(users);
}

async function createUser(req, res) {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, 2);
    const user = await User.create({
      ...body,
      password: hashedPassword,
    });
    res.json(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function updateUser(req, res) {
  const {
    params: { id },
  } = req;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(400).send("User isn't found");
  }

  res.json(updatedUser);
}

async function deleteUser(req, res) {
  const {
    params: { id },
  } = req;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(400).send("User isn't found");
  }

  res.json(deletedUser);
}

function validateId(req, res, next) {
  const {
    params: { id },
  } = req;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Your id is not valid');
  }

  next();
}

async function getUser(req, res) {
  const {
    params: { id },
  } = req;

  const user = await User.findById(id).populate('taskIds');

  if (!user) {
    return res.status(400).send("User isn't found");
  }

  res.json(user);
}

async function createUserTask(req, res) {
  const {
    params: { id },
  } = req;

  const task = await Task.create(req.body);

  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        taskIds: task._id,
      },
    },
    {
      new: true,
    }
  );

  if (!user) {
    return res.status(400).send("User isn't found");
  }

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
        tasks: {
          _id: taskId,
        },
      },
    },
    {
      new: true,
    }
  );

  if (!user) {
    return res.status(400).send("User isn't found");
  }

  res.json(user);
}

async function login(req, res) {
  const {
    body: { email, password },
  } = req;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(401).send('Authentication is failed');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send('Authentication is failed');
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET
  );

  return res.json({ token });
}

async function authorize(req, res, next) {
  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    return res.status(401).send('User is unauthorized');
  }
  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = payload;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).send('User is unauthorized');
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send(error.message);
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  validateId,
  getUser,
  createUserTask,
  deleteUserTask,
  login,
  authorize,
};
