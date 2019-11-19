import React from 'react';
import initialData from './data';
import Styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'

const Container = Styled.div`
    border: 1px solid white;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`


const Task = (props) => {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {provided => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {props.task.content}
                </Container>
            )}

        </Draggable>
    )
}

export default Task;