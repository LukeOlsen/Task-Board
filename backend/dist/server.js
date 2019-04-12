"use strict";

var _initialData = _interopRequireDefault(require("../initialData.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var helmet = require('helmet');

var app = express();
app.use(helmet());

var bodyParser = require('body-parser');

var cors = require('cors');

var mongoose = require('Mongoose');

var PORT = 4000;
var userRoutes = express.Router();
var dataRoutes = express.Router();

var MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
var client = new MongoClient(process.env.DB_ROUTE, {
  useNewUrlParser: true
});
client.connect(function (err) {
  var db = client.db(process.env.DB_NAME);
  var user = db.collection('User');
  console.log("connected to DB");
  app.get('/', function (req, res) {
    console.log("WELCOME!");
    res.json({
      "type": "you did it"
    });
  });
  dataRoutes.route('/first').post(function (req, res) {
    var initialData = _initialData["default"];
    db.collection('Data').save(initialData).then(function (data) {
      res.status(200).json({
        "data": "data added successfully"
      });
    })["catch"](function (err) {
      res.status(400).send('adding new data failed');
    });
  });
  userRoutes.route('/add').post(function (req, res) {
    console.log(req.body);
    user.insertOne(req.body).then(function (data) {
      res.status(200).json({
        'user': 'user added successfully!'
      });
    })["catch"](function (err) {
      res.status(400).send('adding new data failed');
    });
  });
  userRoutes.route('/').get(function (req, res, next) {
    user.find({}).toArray(function (error, users) {
      if (err) throw error;
      res.send(users);
    });
  });
  app.use('/user', userRoutes);
  app.use('/data', dataRoutes);
  app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
  });
});