const Project = require('./Project');

async function getProjects(req, res) {
    const projects = await Project.find();
    res.json(projects);
}

module.exports = {
    getProjects,
};
