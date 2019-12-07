import React from 'react';
import initialData from './data';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import Styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    addTaskFrom: {
        margin: theme.spacing(1),
        width: 200,
    }
}));

const Project = () => {
    const currentProject = '5de80a245e8a394754f04aef'
    const classes = useStyles();
    const [columnData, setColumnData] = React.useState(null);
    const [columnTaskData, setColumnTaskData] = React.useState(null);
    const [showAddTaskForm, setShowAddTaskForm] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [taskTitle, setTaskTitle] = React.useState('')
    const [description, setDescription] = React.useState('')

    React.useEffect(() => {
        getProjectData()
    }, [])

    const updateColumns = (column) => {
        axios.patch(`http://localhost:3000/api/projects/updateColumns/${currentProject}`, {
            columns: column
        }, {
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        .then((response) => {
            console.log(response)
        })
    }

    const getProjectData = async () => {
        const response = await axios.get(`http://localhost:3000/api/projects/currentProjectData/${currentProject}`, {
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        .then((response) => {
            setColumnData(response.data[0])
        })
        .then(() => {
            setIsLoading(false)
        })
        console.log(1)
    }

    const onDragEndd = result => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const start = columnData.columns.find(x => x._id === source.droppableId)
        const finish = columnData.columns.find(x => x._id === destination.droppableId)
        console.log(start, finish)
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };
            console.log(newColumn)
            let objIndex = columnData.columns.findIndex(obj => obj._id === newColumn._id)
            const columnClone = columnData
            columnClone.columns[objIndex] = newColumn
            // columnClone.columns.splice(1, objIndex, newColumn)
            console.log(columnClone)

            console.log(objIndex, columnClone, newColumn)
            // const newColumnData = {
            //     ...columnData,
            //     columns: {
            //         ...columnData.columns,
            //         [newColumn._id]: newColumn
            //     }
            // }
            //console.log(newColumnData)
            updateColumns(columnClone.columns)
            //getProjectData();
            setColumnData({...columnClone});
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };
        const newColumn = {
            ...columnData,
            columns: {
                ...columnData.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            },
        }
        setColumnData(newColumn);
    }

    const addTask = () => {
        setShowAddTaskForm(false);
        console.log(columnData)
        axios.patch('http://localhost:3000/api/projects/task/5de80a245e8a394754f04aef', {
            taskTitle,
            description
        }, {
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        .then(() => {
            getProjectData();
        })
    }

    return (
        <Container fixed style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex' }}>
                <Fab color="primary" aria-label="add" style={{ marginRight: '20px' }} onClick={() => setShowAddTaskForm(true)}>
                    <AddIcon />
                </Fab>
                {showAddTaskForm &&
                    <div >
                        <TextField id="standard-basic" label="Standard" style={{ marginRight: '20px' }} onChange={e => setTaskTitle(e.target.value)} />
                        <TextField id="standard-basic" label="Standard" style={{ marginRight: '20px' }} onChange={e => setDescription(e.target.value)} />
                        <Button variant="contained" color="secondary" style={{ marginTop: '12px' }} onClick={addTask}>
                            Add
                        </Button>
                    </div>
                }
                <Button variant="contained" color="primary" style={{ marginLeft: 'auto' }}>
                    Add column
                </Button>
            </div>
            <DragDropContext onDragEnd={onDragEndd}>
                {!isLoading &&
                    <Grid container spacing={3} style={{border: '1px solid', background: 'wheat'}}>
                        {columnData.columnOrder.map((columnId, index) => {
                           
                            const column = columnData.columns.find(x => x._id === columnId);
                            console.log(column)
                            console.log('render')
                            const tasks = column.taskIds.map(taskId => columnData.tasks.find(x => x._id === taskId))
                            console.log(tasks)
                            return <Column key={column._id} column={column} tasks={tasks} columnLength={columnData.columnOrder.length} />
                        })}
                    </Grid>
                }
            </DragDropContext>
        </Container >
    )
}

export default Project;