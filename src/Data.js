const Data = {
    todo: [
        {
            id: '1',
            title: 'test title',
            description: 'test description',
            dueDate: '',
            complete: false,
            edit: false
        }
    ],
    columns: {
        'col-1-to-do': {
            id: 'col-1',
            title: 'To Do',
            todoId: ['1']
        },
        'col-2-working': {
            id: 'col-2',
            title: 'In Progress',
            todoId: []
        },
        'col-3-wait-appr': {
            id: 'col-3',
            title: 'Awaiting Approval',
            todoId: []
        },
        'col-4-complete': {
            id: 'col-4',
            title: 'Complete',
            todoId: []
        }
    }
}

export default Data;