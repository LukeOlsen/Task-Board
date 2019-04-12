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
import Data from './initialData.js';
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
        let initialData = Data;
        db.collection('Data').save(initialData)
                             .then(data => {
                                 res.status(200).json({"data": "data added successfully"})
                             })
                             .catch(err => {
                                 res.status(400).send('adding new data failed')
                             })
    });
    
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


