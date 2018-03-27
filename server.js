const express        = require('express');
//const MongoClient    = require('mongodb').MongoClient;
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const expressSession = require('express-session');
const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const db             = require('./config/db');
const app            = express();
const port           = 8080;
app.use(bodyParser.urlencoded({ extended: true })); // to read url
app.use(bodyParser.json()); // to use JSON
app.use(cookieParser());
app.use(expressSession({
    secret: db.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport configuration
var User = require('./app/routes/user');
//console.log(User);
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*mongoose.connect(db.url).then(
    () => {
        MongoClient.connect(db.url, (err, client) => { // connect to db
        if (err) return console.log(err)
        require('./app/routes')(app, client);
        app.listen(port, () => {
            console.log('Server started at port ' + port);
            });               
        });
    },
    err => {
        console.log(err.message);
    }
);*/
require('./app/routes')(app);

mongoose.connect(db.url, () => {
    console.log('connected to mongodb');
});

app.listen(port, () => {
    console.log('Server started at port ' + port);
});