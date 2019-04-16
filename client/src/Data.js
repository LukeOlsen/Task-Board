const Data = {
    user: '',
    userId: '',
    projects: {
        active: '1',
        numberOfProjects: 2,
        '1': {
            id: '1',
            title: 'New Project',
            editTitle: false,
            tempProjTitle: 'New Project',
            data: {
                todo: {
                    '1': {
                         id: '1',
                         title: 'Welcome To Your Board',
                         description: 'test description',
                         dueDate: '',
                         complete: false
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
                 columnsort: ['col-1', 'col-2', 'col-3', 'col-4'],
                 count: 3,
                 showPop: false,
                 edit: false,
                 currentEditId: '',
                 tempTitle: '',
                 tempDate: '',
                 tempDescription: ''
            }
        }
               
    }
}

export default Data;
