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

addColumnsToProject = async (req, res) => {
    try {
        const id = '';
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
        // .then(async (response) => {
        //     console.log(req.body.columnTitle)
        //     console.log(2)
        //     const addColumnIdToColumnOrder = await ProjectsPosts.find({'columns.columnTitle': req.body.columnTitle})
        //     console.log(addColumnIdToColumnOrder[0].columns)
        //     addColumnIdToColumnOrder[0].columns.map(column => {
        //         console.log(column)
        //         Object.keys(column).map(key => {
        //             console.log(dd)
        //             if(column['columnTitle'] === req.body.columnTitle) {
        //                 id = column['_id'];
        //                 return
        //             }
        //         })
        //     })

        // })
        // // .then(async () => {
        // //     console.log(id)
        // //     const addIdToColumnList = await ProjectsPosts.updateOne(
        // //         {_id: req.params.projectId},
        // //         {
        // //             $push: {
        // //                 columnOrder: id
        // //             }
        // //         }
        // // )
        // // })
        res.status(200).json(column);
    } catch (err) {
        console.log(1)
        res.status(400).json(err)
    }
}

module.exports.addProject = addProject;
module.exports.addUserToProject = addUserToProject;
module.exports.deleteProject = deleteProject;
module.exports.addTaskToProject = addTaskToProject;
module.exports.addColumnsToProject = addColumnsToProject;