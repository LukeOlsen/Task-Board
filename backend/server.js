const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('Mongoose')
const PORT = 4000;
require('dotenv').config()

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.DB_ROUTE, {useNewUrlParser: true});
const conn = mongoose.connection

conn.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const dataRoutes = express.Router();

dataRoutes.route('/').get(function(req, res) {
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
    Data.projects[Data.projects[active]].todo.findById(id, function(err, data){
        res.json(data)
    })
});

dataRoutes.route('/add').post(function(req, res) {
    let data = new Data(req.body);
    data.save()
        .then(data => {
            res.status(200).json({'data': 'data added successfully!'})
        })
        .catch(err => {
            res.status(400).send('adding new data failed');
        })
})

app.use('/data', dataRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});