const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Data = new Schema({
    userId: {type: String},
    user: {type: String},
    projects: {
        active: {type: Number},
        numberOfProjects: {type: Number},
        projectFormat: {
            id: {type: Number},
            title: {type: String},
            editTitle: {type: Boolean},
            tempProjTitle: {type: String},
            dataFormat: {
                todo: {
                    id: {type: String},
                    title: {type: String},
                    description: {type: String},
                    dueDate: {type: Date},
                    complete: {type: Boolean}
                },
                columns: {
                    id: {type: String},
                    title: {type: String},
                    todoId: [{type: String}]
                },
                columnsort: [{type: String}],
                count: {type: String},
                showPop: {type: Boolean},
                edit: {type: Boolean},
                currentEditId: {type: String},
                tempTitle: {type: String},
                tempDate: {type: Date},
                tempDescription: {type: String},
            }
        }
    }
})

module.exports = mongoose.model('Data', Data);