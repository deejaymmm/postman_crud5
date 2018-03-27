//const router = require('express').Router();
const passport = require('passport');
//module.exports = function(app, client) {
module.exports = function(app) {
  //const db = client.db('postman_crud');
  const mongoose = require('mongoose');
  var ObjectID = require('mongodb').ObjectID;  
  var User = require('./user');

  // for login 
  app.post('/login', (req, res) => {
    passport.authenticate('local')(req, res, () => {
      console.log(req.body);
      res.send(req.body);
      //res.redirect('/');
    });
  });
  
  // registration
  app.post('/register', (req, res) => {
    User.register(new User(
        {username: req.body.username,
        email: req.body.email}),
        req.body.password,
        (err, user) => {
            passport.authenticate('local')(req, res, () => {
                if (err) {
                   console.log(err.message);
                   return res.send(err.message);
                }
                console.log(req.body);
                res.send(req.body);
                //res.redirect('/');
            });
         }
    )
  });  

   // logout
   app.get('/logout', (req, res) => { 
      req.logout();
      //res.redirect('/');
      res.send('Logged out.');
    });


  // Home
  app.get('/', (req, res)=>{
    res.send('Home.');
  });

  // LIST 
  app.get('/users/', (req, res) => {
    User.find().then(
        item => {
            res.send(item);
            console.log(item);
        },
        err => {
            res.send(err);
            console.log(err.message);
        }
    );
  });  
  
  // CREATE
  app.post('/', (req, res) => {
    var newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    newUser.save().then(
        () => {
            res.send(newUser);
            console.log(newUser + ' is saved.');
        },
        err => {
            res.send(err);
            console.log(err.message);
        }
    );
  });

  // READ 
  app.get('/:id', (req, res) => {
    var id = req.params.id;
    User.findById(id).then(
        item => {
            res.send(item);
            console.log(item + ' has been readed.');
        },
        err => {
            res.send(err);
            console.log(err.message);
        }
    );
  });

  // UPDATE 
  app.put ('/:id', (req, res) => {
    var id = req.params.id;
    User.findByIdAndUpdate(id, req.body).then(
        () => {
            res.send(id + JSON.stringify(req.body));
            console.log(id + ' ' + JSON.stringify(req.body) + ' has been updated.');
        },
        err => {
            res.send(err);
            console.log(err.message);
        }
    );    
  });
  
// DELETE 
  app.delete('/:id', (req, res) => {
    var id = req.params.id;
    var details = {'_id': new ObjectID(id)};
    User.remove(details).then(
        () => {
            res.send(id + ' has been deleted.');
            console.log(id + ' has been deleted.');
        },
        err => {
            res.send(err);
            console.log(err.message);
        }
    );
  });

};