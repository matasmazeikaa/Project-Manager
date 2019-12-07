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

getCurrentProjectData = async (req, res) => {
    try {
        const projectData = await ProjectsPosts.find({
            _id: req.params.projectId
        })
        res.status(200).json(projectData)
    } catch (err) {
        res.status.json({message: err})
    }
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

updateColumns = async (req, res) => {
    try {
        const updateColumn = await ProjectsPosts.updateOne(
            {_id: req.params.projectId},
            {
                $set: {
                    columns: req.body.columns
                }
            }
        )
        res.status(200).json(updateColumn)
    } catch (err) {
        res.status(400).json({message: err})
    }
}

getAllProjectsThatBelongToUser = async (req, res) => {
    try {
        const projects = await ProjectsPosts.find({
            projectManagerId: req.user._id
        })
        console.log(projects)
        res.status(200).json(projects)
    } catch (err) {
        res.status(400).json({message: err})
    }
}

addTaskToProject = async (req, res) => {
    console.log(req.body)
    let taskId = '';
    let columns = [];
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
        .then( async () => {
            const task = await ProjectsPosts.find({'tasks.taskTitle': req.body.taskTitle})
            .then( async (response) => {
                columns = response[0].columns
                console.log(columns[0].taskIds)
                await response[0].tasks.forEach(task => {
                    if (task.taskTitle === req.body.taskTitle) {
                        taskId = task._id
                        columns[0].taskIds.push(task._id)
                    }
                })
            })
            .then( async () => {
                await ProjectsPosts.updateOne(
                    {_id: req.params.projectId},
                    {
                        $set: {
                            columns: columns
                        }
                    }
                )
            })
        })
        res.status(200).json(task)
    } catch (err) {
        res.status(400).json({message: err})
    }
}

addColumnsToProject = async (req, res) => {
    try {
        let id = '';
        const obj = await Object.create({
            columnTitle: req.body.columnTitle
        })
        const column = await ProjectsPosts.updateOne(
                {_id: req.params.projectId},
                {
                    $push: {
                        columns: {
                            columnTitle: req.body.columnTitle,
                        }
                    }
                }
        )
        .then( async () => {
            console.log(req.body.columnTitle)
            const getColumns = await ProjectsPosts.find({'columns.columnTitle': req.body.columnTitle})
            .then( async (response) => {
                //console.log(getColumns)
                await response[0].columns.forEach(column => {
                    if (column.columnTitle === req.body.columnTitle) {
                        console.log(column._id)
                        id = column._id
                    }
                });
            })
                .then(async () => {
                    const columnId = await ProjectsPosts.updateOne(
                        { _id: req.params.projectId },
                        {
                            $push: {
                                columnOrder: id
                            }
                        }
                    )
                    res.json(columnId)
                })
        })
        res.json(column)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

module.exports.addProject = addProject;
module.exports.addUserToProject = addUserToProject;
module.exports.deleteProject = deleteProject;
module.exports.addTaskToProject = addTaskToProject;
module.exports.addColumnsToProject = addColumnsToProject;
module.exports.getAllProjectsThatBelongToUser = getAllProjectsThatBelongToUser;
module.exports.getCurrentProjectData = getCurrentProjectData;
module.exports.updateColumns = updateColumns;