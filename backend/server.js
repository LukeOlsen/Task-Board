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

app.use('/data', dataRoutes);

dataRoute.route('/').get(function(req, res) {
    Data.find(function(err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data);
        }
    })
})


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});