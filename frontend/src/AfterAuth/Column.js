import React from 'react';
import Styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task';
import Grid from '@material-ui/core/Grid';

const Container = Styled.div`
    width: 220px;
    margin: 8px;
    border: 1px solid white;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
`
const Title = Styled.h3`
    padding: 8px;
`
const TaskList = Styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 100px;
`

const Column = (props) => {
    return (
        <Grid item xs={12 / props.columnLength}>
            <Title>{props.column.columnTitle}</Title>
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