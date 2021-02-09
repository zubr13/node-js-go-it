const {
  Types: { ObjectId },
} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./User');

async function getUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

async function createUser(req, res) {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, 14);
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

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).send("User isn't found");
  }

  res.json(user);
}

async function createUserTask(req, res) {
  const {
    params: { id },
  } = req;

  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        tasks: req.body,
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
};
