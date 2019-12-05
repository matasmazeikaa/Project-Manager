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

    const classes = useStyles();
    const [columnData, setColumnData] = React.useState(initialData);
    const [columnTaskData, setColumnTaskData] = React.useState(null);
    const [showAddTaskForm, setShowAddTaskForm] = React.useState(false);
    const [taskTitle, setTaskTitle] = React.useState('')
    const [description, setDescription] = React.useState('')

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

        const start = columnData.columns[source.droppableId];
        const finish = columnData.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };
            const newColumnData = {
                ...columnData,
                columns: {
                    ...columnData.columns,
                    [newColumn.id]: newColumn
                }
            }
            setColumnData(newColumnData);
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
    }

    return (
        <Container fixed style={{ marginTop: '40px' }}>
            <div style={{display: 'flex'}}> 
                <Fab color="primary" aria-label="add" style={{ marginRight: '20px'}} onClick={() => setShowAddTaskForm(true)}>
                    <AddIcon />
                </Fab>
                {showAddTaskForm &&
                    <div > 
                        <TextField id="standard-basic" label="Standard" style={{marginRight: '20px'}} onChange={e => setTaskTitle(e.target.value)}/>
                        <TextField id="standard-basic" label="Standard" style={{marginRight: '20px'}} onChange={e => setDescription(e.target.value)}/>
                        <Button variant="contained" color="secondary" style={{ marginTop: '12px' }} onClick={addTask}>
                            Add
                        </Button>
                    </div>
                }
                <Button variant="contained" color="primary" style={{ marginLeft:'auto'}}>
                    Add column
                </Button>
            </div>
            <DragDropContext onDragEnd={onDragEndd}>

                <Grid container spacing={3}>
                    {columnData.columnOrder.map(columnId => {
                        const column = columnData.columns[columnId];
                        const tasks = column.taskIds.map(taskId => columnData.tasks[taskId])

                        return <Column key={column.id} column={column} tasks={tasks} columnLength={columnData.columnOrder.length} />
                    })}
                </Grid>

            </DragDropContext>
        </Container >
    )
}

export default Project;