const auth = require('../auth/auth');
const ProjectsPosts = require('../model/Projects');

addProject = async (req, res) => {
    const post = new ProjectsPosts({
        projectTitle: req.body.projectTitle,
        description: req.body.description,
        projectManagerId: req.user._id
        
    })
    post.save()
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err})
        })
}

addUserToProject = async (req, res) => {
    try {
        const addUserToProject = await ProjectsPosts.updateOne({_id: req.params.projectId},
            {$push: {
                usersOnProject: req.body.userId
            }})
            res.status(200).json(addUserToProject)
    } catch (err) {
        res.status.json({message: err})
    }
}

deleteProject = async (req, res) => {
    try {
        const removeProject = await ProjectsPosts.deleteOne({
            _id: req.params.projectId
        });
        res.status(200).json(removeProject)
    } catch (err) {
        res.status(400).json({message: err});
    }
}

addTaskToProject = async (req, res) => {
    console.log(req.body)
    try {
        const task = await ProjectsPosts.updateMany(
            {_id: req.params.projectId},
            {
                $push: {
                    tasks: {
                        taskTitle: req.body.taskTitle,
                        description: req.body.description,
                    }
                }
            }
        )
        res.status(200).json(task)
    } catch (err) {
        res.status(400).json({message: err})
    }
}

module.exports.addProject = addProject;
module.exports.addUserToProject = addUserToProject;
module.exports.deleteProject = deleteProject;
module.exports.addTaskToProject = addTaskToProject;