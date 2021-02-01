const { Router } = require('express');
const ProjectController = require('./project.controller');

const router = Router();

router.get('/', ProjectController.getProjects);

module.exports = router;
