const router = require('express').Router();
const auth = require('../auth/auth');
const ProjectsPosts = require('../model/Projects');
const {
    addProject, 
    addUserToProject, 
    deleteProject, 
    addTaskToProject, 
    addColumnsToProject, 
    getAllProjectsThatBelongToUser, 
    getCurrentProjectData, 
    updateColumns, 
    deleteTask
} = require('../controlers/projects');


router.delete('/:projectId', auth, deleteProject)
router.patch('/:projectId', auth, addUserToProject)
router.get('/allUserProjects', auth, getAllProjectsThatBelongToUser)
router.get('/currentProjectData/:projectId', auth, getCurrentProjectData)
router.patch('/deleteTask/:projectId', auth, deleteTask)
router.patch('/updateColumns/:projectId', auth, updateColumns)
router.patch('/task/:projectId', auth, addTaskToProject)
router.patch('/columns/:projectId', auth, addColumnsToProject)
router.post('/', auth , addProject)

module.exports = router;