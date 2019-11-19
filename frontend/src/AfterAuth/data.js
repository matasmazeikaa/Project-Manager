const initialData = {
    tasks: {
        'task1': {id: 'task1', content: '1'},
        'task2': {id: 'task2', content: '2'},
        'task3': {id: 'task3', content: '3'},
        'task4': {id: 'task4', content: '4'},
    },
    columns: {
        'column1': {
            id: 'column1',
            title: 'To do',
            taskIds: ['task1', 'task2', 'task3', 'task4']
        },
        'column2': {
            id: 'column2',
            title: 'In proggress',
            taskIds: []
        },
        'column3': {
            id: 'column3',
            title: 'Done',
            taskIds: []
        }
    },
    columnOrder: ['column1', 'column2', 'column3']
}

export default initialData;