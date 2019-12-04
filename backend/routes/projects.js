const router = require('express').Router();
const auth = require('../auth/auth');
const ProjectsPosts = require('../model/Projects');
const {addProject, addUserToProject, deleteProject, addTaskToProject, addColumnsToProject, getAllProjectsThatBelongToUser} = require('../controlers/projects');


router.delete('/:projectId', auth, deleteProject)
router.patch('/:projectId', auth, addUserToProject)

router.get('/allUserProjects', auth, getAllProjectsThatBelongToUser)

//Add task to project
router.patch('/task/:projectId', auth, addTaskToProject)

router.patch('/columns/:projectId', auth, addColumnsToProject)

router.post('/', auth , addProject)

module.exports = router;