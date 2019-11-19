import React from 'react';
import initialData from './data';
import Column from './Column';
import {DragDropContext} from 'react-beautiful-dnd';
import Styled from 'styled-components';

const Container = Styled.div`
    display: flex;
`

const Project = () => {
    const [columnData, setColumnData] = React.useState(initialData);
    const [columnTaskData, setColumnTaskData] = React.useState(null)
    console.log(columnData)

    const onDragEndd = result => {
        const { destination, source, draggableId } = result;
        //debugger
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

    return (
        <DragDropContext onDragEnd={onDragEndd}>
            <Container>
            {console.log(columnData.columnOrder)}
            {columnData.columnOrder.map(columnId => {
                const column = columnData.columns[columnId];
                const tasks = column.taskIds.map(taskId => columnData.tasks[taskId])

                return <Column key={column.id} column={column} tasks={tasks} />
            })}
            </Container>
        </DragDropContext>
    )
}

export default Project;