const express = require('express');
const helmet = require('helmet')
const app = express();
app.use(helmet());
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const userRoutes = express.Router();
const dataRoutes = express.Router();
var passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

app.use(cors());
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session())

const boardTemplate = {
    user: '',
    userId: '',
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

const client = new MongoClient(process.env.DB_ROUTE, {useNewUrlParser: true})

client.connect(err => {
    const db = client.db(process.env.DB_NAME)
    const boards = db.collection('Boards');
    const User = db.collection('User')
    console.log("connected to DB")

    passport.serializeUser(function(user, done) {
        console.log(user)
        done(null, user);
      });
      
    passport.deserializeUser(function(user, done) {
       // console.log(user)
        // done(null, user);
        User.findOne({googleId: user.googleId}).then(user => {
            console.log("Deserializer:")
            console.log(user)
            done(null, user)
        })
     });

    app.get('/', function(req, res) {
        console.log("WELCOME!")
        console.log(req.session.passport.user)
        if (req.session.passport.user) {
            res.redirect('http://localhost:3000/board/user')
        } else {
            res.redirect('http://localhost:3000/')
        }
    })
    
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id }).then(user => {
            if (user) {
                console.log("Passport use:")
                console.log(user)
                cb(null, user)
            } else {
                const newUser = {
                    googleId: profile.id,
                    name: profile.displayName,
                    imageUrl: profile._json.profile_image_url
                };
                console.log(newUser)
                User.insertOne(newUser)
                let newBoard = boardTemplate;
                newBoard.user = newUser.name;
                newBoard.userId = newUser.googleId;
                boards.insertOne(newBoard);
                cb(null, newUser)
            }
        })
      }
    ));

    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

    app.get('/auth/google/redirect', 
    passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log("SUCCESS")
        console.log(user)
        res.redirect('http://localhost:3000/');
    });

    

    dataRoutes.route('/first').post(function(req, res){
        db.collection('Data').insertOne(newBoard)
                             .then(data => {
                                 res.status(200).json({"data": "data added successfully"})
                             })
                             .catch(err => {
                                 res.status(400).send('adding new data failed')
                             })
    });

    dataRoutes.route('/pull').get(function(req, res) {
        console.log(req.session.passport.user.googleId)
        db.collection('Boards').findOne({userId: req.session.passport.user.googleId}).then(data => {
            console.log(data)
            res.send(data)
        }).catch(err => {
            res.status(400).send('big fail time')
        })
    })

    dataRoutes.route('/update').post(function(req, res){
        console.log(req.body)
        let updateData = req.body
        db.collection('Boards').findOneAndReplace({userId: updateData.userId}, 
            {
                userId: updateData.userId, 
                user: updateData.user,
                projects: updateData.projects
            }, 
            {returnNewDocument: true}
            ).then(data => {
            console.log("Update Data:")
            console.log(data.value)
            res.send(data.value)
        }).catch(err => {
            res.status(400).send("Unable to update board.")
        })
        // db.collection('Boards').findOne({userId: updateData.userId}).then(data => {
        //     console.log(data)
        //     console.log("success:")
        //     console.log(data)
        // }).catch(err => {
        //     res.status(400).send("no good")
        // })
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


