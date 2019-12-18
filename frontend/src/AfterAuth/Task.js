import React from 'react';
import Styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'

const Container = Styled.div`
    color: white;
    border: 0;
    height: 48px;
    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
    border-radius: 3px;
    vertical-align: middle;
    padding-top: 11px;
    padding-left: 20px;
    font-size: 18px;
    margin-bottom: 6px;
`


const Task = (props) => {
    return (
        <Draggable draggableId={props.task._id} index={props.index}>
            {provided => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {props.task.taskTitle}
                </Container>
            )}

        </Draggable>
    )
}

export default Task;