const express = require('express');
const helmet = require('helmet')
const app = express();
app.use(helmet());
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('Mongoose');
const PORT = 4000;
const userRoutes = express.Router();
const dataRoutes = express.Router();
const MongoClient = require('mongodb').MongoClient;
// import Data from '../initialData.js';
require('dotenv').config()


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const client = new MongoClient(process.env.DB_ROUTE, {useNewUrlParser: true})

client.connect(err => {
    const db = client.db(process.env.DB_NAME)
    const user = db.collection('User')
    console.log("connected to DB")


    app.get('/', function(req, res) {
        console.log("WELCOME!")
        res.json({"type": "you did it"})
    })

    dataRoutes.route('/first').post(function(req, res){
        let initialData = {
            user: 'Luke',
            userId: '123',
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
                },
                '2': {
                    id: '2',
                    title: 'Second Project',
                    data: {
                        todo: {
                            '1': {
                                 id: '1',
                                 title: 'You have accessed the second project',
                                 description: 'test description',
                                 dueDate: '',
                                 complete: false
                             },
                             '2': {
                                 id: '2',
                                 title: 'great job',
                                 description: 'do even more things',
                                 dueDate: '',
                                 complete: false
                             },
                             '3': {
                                 id: '3',
                                 title: 'now do it again',
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
                }
            }
        }
        console.log(initialData)
        db.collection('Data').insertOne(initialData)
                             .then(data => {
                                 res.status(200).json({"data": "data added successfully"})
                             })
                             .catch(err => {
                                 res.status(400).send('adding new data failed')
                             })
    });

    dataRoutes.route('/pull').get(function(req, res) {
        db.collection('Data').findOne({}).then(data => {
            res.send(data)
        }).catch(err => {
            res.status(400).send('big fail time')
        })
    })
    
    userRoutes.route('/add').post(function(req, res) {
        console.log(req.body);
        
        user.insertOne(req.body)
            .then(data => {
                res.status(200).json({'user': 'user added successfully!'})
            })
            .catch(err => {
                res.status(400).send('adding new data failed');
            })
    })
    
    userRoutes.route('/').get(function(req, res, next) {
        user.find({}).toArray(function(error, users) {
            if (err) throw error;
        
            res.send(users);
        });
    })
    
    app.use('/user', userRoutes);
    app.use('/data', dataRoutes);
    
    app.listen(PORT, function() {
        console.log("Server is running on Port: " + PORT);
    });
})


