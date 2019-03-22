const Data = {
    todo: {
       '1': {
            id: '1',
            title: 'test title',
            description: 'test description',
            dueDate: '',
            complete: false
        },
        '2': {
            id: '2',
            title: 'do more things',
            description: 'do even more things',
            dueDate: '',
            complete: false
        },
        '3': {
            id: '3',
            title: 'finish things',
            description: 'stop doing things',
            dueDate: '',
            complete: false
        }
    },
    columns: {
        'col-1': {
            id: 'col-1',
            title: 'To Do',
            todoId: ['1', '2']
        },
        'col-2': {
            id: 'col-2',
            title: 'In Progress',
            todoId: ['3']
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
    columnsort: ['col-1', 'col-2', 'col-3', 'col-4'],
    count: 3,
    showPop: false,
    edit: false,
    currentEditId: '',
    tempTitle: '',
    tempDate: '',
    tempDescription: ''
}

export default Data;