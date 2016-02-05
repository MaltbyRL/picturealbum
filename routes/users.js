'use strict';

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
  storage: multer.memoryStorage()
});
require('dotenv').config();
var aws = require('aws-sdk');
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var s3 = new aws.S3();
var fs = require('fs');


var Image = mongoose.model('Image' , {
  filename: String,
  url: String
});


var authMiddleware = require('../config/auth');

var User = require('../models/user');

var ref = new Firebase('https://ricksloginapp.firebaseio.com/');

router.post('/register', function(req, res, next) {
  console.log('body',req.body);
  ref.createUser(req.body, function(err, userData) {
    console.log("userData from users.js:", userData);
    if(err) return res.status(400).send(err);
    console.log("Reached line 18");
    User.create(userData, function(err, data) {
      if(err) return res.status(400).send(err);
      console.log("passed user data");
      res.send(data);
    });
  });
});

router.post('/login', function(req, res, next) {
  console.log("users/js /login");
  ref.authWithPassword(req.body, function(err, authData) {
    console.log("Auth Data from users.js:", authData);
    if(err) return res.status(400).send(err);
    User.findOne({uid: authData.uid}, function(err, user) {
      var token = user.generateToken();
      // console.log("token from users.js:", token);
      res.cookie('mytoken', token).send();
    });
  });
});


router.get('/profile', authMiddleware, function(req, res) {
  //// logged in,   req.user
  User.findById(req.user._id, function(err, user) {
    res.send(user);
  });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
  // $('login').show()
});

router.post('/album', function(req, res) {
  res.send('posted')
})

router.post('/changepw', function(req, res, next) {
  console.log('changepw');
  ref.changePassword(req.body, function(error) {
    if (error) {
      switch (error.code) {
        case "INVALID_PASSWORD":
          console.log("The specified user account password is incorrect.");
          break;
        case "INVALID_USER":
          console.log("The specified user account does not exist.");
          break;
        default:
          console.log("Error changing password:", error);
      }
    } else {
      res.send('success!');
      console.log("User password changed successfully!");
    }
  });
});


module.exports = router;

// 'use strict';
//
// var express = require('express');
// var router = express.Router();
// var multer = require('multer');
// var upload = multer({
//   storage: multer.memoryStorage()
// });
//
// router.post('/', upload.array('images'), function(req, res) {
//   console.log("req.files:", req.files);
//   // console.log("res:", res);
//   res.redirect('/')
// })
//
// module.exports = router;
//
//
//   async.each(req.files, function(file, cb) {
//     // put object stuff
//     s3.putObject(..., function() {
//
//       ...
//       image.save(function(err){
//         cb(err)
//       });
//     });
//   }, function(err) {
//     res.send();
//   });

  /*
photo album
  have users login log out,
  can create an album,
  can have a number of images inside,
  user can upload an image.
  user can look at different album,
  click on an image and see a full size image.
  */
