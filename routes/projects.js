const router = require('express').Router();
const auth = require('../auth/auth');
const ProjectsPosts = require('../model/Projects');
const {addProject, addUserToProject, deleteProject, addTaskToProject} = require('../controlers/projects');


router.delete('/:projectId', auth, deleteProject)
router.patch('/:projectId', auth, addUserToProject)

//Add task to project
router.patch('/task/:projectId', auth, addTaskToProject)


router.post('/', auth , addProject)

module.exports = router;