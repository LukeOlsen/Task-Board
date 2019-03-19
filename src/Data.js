const Data = {
    todo: {
       '1': {
            id: '1',
            title: 'test title',
            description: 'test description',
            dueDate: '',
            complete: false,
            edit: false
        }
    },
    columns: {
        'col-1': {
            id: 'col-1',
            title: 'To Do',
            todoId: ['1']
        },
        'col-2': {
            id: 'col-2',
            title: 'In Progress',
            todoId: []
        },
        'col-3': {
            id: 'col-3',
            title: 'Awaiting Approval',
            todoId: []
        },
        'col-4': {
            id: 'col-4',
            title: 'Complete',
            todoId: []
        }
    },
    columnsort: ['col-1', 'col-2', 'col-3', 'col-4']
}

export default Data;