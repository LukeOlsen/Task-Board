const Data = {
    loading: false,
    projects: {
        active: '1',
        numberOfProjects: 1,
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
                         title: 'First Column',
                         todoId: ['1']
                     }
                 },
                 columnsort: ['col-1'],
                 columnCount: 1,
                 count: 1,
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
