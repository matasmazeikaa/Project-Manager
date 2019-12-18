import React from 'react';
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

const StyledGrid = Styled(Grid)`&&&&&&&&{
    border: 0 !important;
    box-shadow: rgba(33, 203, 243, 0.3) 0px 3px 5px 2px  !important;
    background: linear-gradient(45deg, rgb(33, 150, 243) 30%, rgb(33, 203, 243) 90%) !important;
    border-radius: 3px !important;
}
`

const Project = (props) => {
    const currentProject = props.currentProject
    const classes = useStyles();
    const [columnData, setColumnData] = React.useState(null);
    const [columnTaskData, setColumnTaskData] = React.useState(null);
    const [showAddTaskForm, setShowAddTaskForm] = React.useState(false);
    const [showAddColumnForm, setShowAddColumnForm] = React.useState(false);
    const [columnTitle, setColumnTitle] = React.useState('');
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
    }

    const onDragComplete = result => {
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

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            let objIndex = columnData.columns.findIndex(obj => obj._id === newColumn._id)
            const columnClone = columnData
            columnClone.columns[objIndex] = newColumn
            updateColumns(columnClone.columns)
            setColumnData({...columnClone});
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }
        let newStartIndex = columnData.columns.findIndex(obj => obj._id === newStart._id)
        const columnClone = columnData
        columnClone.columns[newStartIndex] = newStart

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };
        let newFinishIndex = columnData.columns.findIndex(obj => obj._id === newFinish._id)
        columnClone.columns[newFinishIndex] = newFinish

        updateColumns(columnClone.columns)
        setColumnData({...columnClone});
    }

    const addTask = () => {
        setShowAddTaskForm(false);
        axios.patch(`http://localhost:3000/api/projects/task/${currentProject}`, {
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

    const addColumn = () => {
        setShowAddColumnForm(false);
        axios.patch(`http://localhost:3000/api/projects/columns/${currentProject}`, {
            columnTitle
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
            <div style={{ display: 'flex', marginBottom: '18px' }}>
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
                {showAddColumnForm && 
                    <div>
                        <TextField id="standard-basic" label="Standard" style={{ marginLeft: 'auto' }} onChange={e => setColumnTitle(e.target.value)} />
                        <Button variant="contained" color="secondary" style={{ marginTop: '12px' }} onClick={addColumn}>
                            Add Column Confirmation
                        </Button>
                    </div>
                }
                <Button variant="contained" color="primary" style={{ marginLeft: 'auto' }} onClick={() => setShowAddColumnForm(true)}>
                    Add column
                </Button>
            </div>
            <DragDropContext onDragEnd={onDragComplete}>
                {!isLoading &&
                    <StyledGrid container spacing={3} style={{border: '1px solid', background: 'wheat'}}>
                        {columnData.columnOrder.map((columnId, index) => {
                            const column = columnData.columns.find(x => x._id === columnId);
                            const tasks = column.taskIds.map(taskId => columnData.tasks.find(x => x._id === taskId))
                            return <Column key={column._id} column={column} tasks={tasks} columnLength={columnData.columnOrder.length} />
                        })}
                    </StyledGrid>
                }
            </DragDropContext>
        </Container >
    )
}

export default Project;