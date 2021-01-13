const Task = require('./Task');

async function getTasks(req, res) {
    const tasks = await Task.find();
    res.json(tasks);
}

module.exports = {
    getTasks,
};
