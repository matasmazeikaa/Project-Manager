import React from 'react';
import Styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const TaskList = Styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 100px;
`

const Column = (props) => {
    return (
        <Grid item xs={12 / props.columnLength}>
            <Typography variant="h4" component="h2">{props.column.columnTitle}</Typography>
            <Droppable droppableId={props.column._id}>
                {provided => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {props.tasks.map(((task, index) => <Task key={task._id} task={task} index={index} />))}
                        {provided.placeholder}
                    </TaskList>
                )}

            </Droppable>
        </Grid>
    )
}

export default Column;