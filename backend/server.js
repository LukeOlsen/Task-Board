const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('Mongoose');
const PORT = 4000;
const dataRoutes = express.Router();
const userRoutes = express.Router();
require('dotenv').config()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let Data = require('./data.model');
let User = require('./user.model');


mongoose.connect(process.env.DB_ROUTE, {
    useNewUrlParser: true,
    dbName: 'Task-Data'
});
const conn = mongoose.connection

conn.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.get('/', function(req, res) {
    console.log("WELCOME!")
    res.json({"type": "you did it"})
})

dataRoutes.route('/').get(function(req, res) {
    console.log("initial working");
    Data.find(function(err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data);
        }
    })
});

dataRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Data.projects[Data.projects[Data.projects.active]].todo.findById(id, function(err, data){
        res.json(data)
    })
});

dataRoutes.route('/add').post(function(req, res) {
    console.log(req.body)

    data.save()
        .then(data => {
            res.status(200).json({'data': 'data added successfully!'})
        })
        .catch(err => {
            res.status(400).send('adding new data failed');
        })
})

userRoutes.route('/add').post(function(req, res) {
    console.log(req.body);
    const {userName, userId} = req.body;
    console.log(userName)
    console.log(userId)
    let user = new User();
 

    user.userName = userName;
    user.userId = userId;
    user.save()
        .then(data => {
            res.status(200).json({'data': 'data added successfully!'})
        })
        .catch(err => {
            res.status(400).send('adding new data failed');
        })
})

userRoutes.route('/').get(function(req, res) {
    console.log("green weasels")
    User.find((err, users) => {
        if (err) {
            console.log(err)
        } else {
            res.json(users)
        }
    })
})

app.use('/user', userRoutes);

app.use('/data', dataRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});