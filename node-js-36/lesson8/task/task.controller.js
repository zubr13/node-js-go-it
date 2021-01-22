const Task = require('./Task');

async function getTasks(req, res) {
    const tasks = await Task.find();
    res.json(tasks);
}

async function createTask(req, res) {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = {
    getTasks,
    createTask,
};
