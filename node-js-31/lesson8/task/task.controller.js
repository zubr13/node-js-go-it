const Task = require("./Task");

async function getTasks (req, res) {
    const tasks = await Task.find();
    return res.json(tasks);
}

module.exports = {
    getTasks,
};