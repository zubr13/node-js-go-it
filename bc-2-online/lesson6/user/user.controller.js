const {
    Types: { ObjectId },
} = require('mongoose');
const User = require('./User');

async function getUsers(req, res) {
    const users = await User.find();
    res.json(users);
}

async function createUser(req, res) {
    try {
        const { body } = req;
        const user = await User.create(body);
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

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    validateId,
    getUser,
    createUserTask,
    deleteUserTask,
};
