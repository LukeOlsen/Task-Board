const express = require('express');
const helmet = require('helmet')
const app = express();
app.use(helmet());
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('Mongoose');
const PORT = 4000;
const dataRoutes = express.Router();
const userRoutes = express.Router();
const MongoClient = require('mongodb').MongoClient;
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
    
    userRoutes.route('/add').post(function(req, res) {
        console.log(req.body);
        console.log(userName)
        
        user.save(req.body)
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
    
    app.listen(PORT, function() {
        console.log("Server is running on Port: " + PORT);
    });
})


