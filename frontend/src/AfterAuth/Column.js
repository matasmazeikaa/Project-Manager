import React from 'react';
import Styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task';

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
        <Container>
            <Title>{props.column.title}</Title>
            <Droppable droppableId={props.column.id}>
                {provided => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {props.tasks.map(((task, index) => <Task key={task.id} task={task} index={index} />))}
                        {provided.placeholder}
                    </TaskList>
                )}

            </Droppable>
        </Container>
    )
}

export default Column;