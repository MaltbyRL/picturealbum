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


var Image = mongoose.model('images' , {
  filename: String,
  url: String
});


var authMiddleware = require('../config/auth');


router.post('/albumpic', upload.array('image'), function(req, res) {
  console.log("req.files:", req.files);
  // console.log("res:", res);
  res.render('album')
})

mongoose.connect('mongodb://localhost/imageupload', function(err) {
  if(err) return console.log("err:" , err);
  var filename = ""

  fs.readFile("image", function(err, PIC) {
    if(err) console.log("err: ", err);
    var ext = filename.match(/\.\w+$/)[0] || '';
    var key = uuid.v1() + ext;

    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: filename,
      Body:  PIC //data buffer
    };

    s3.putObject(params, function(err, data) {
      if(err) return console.log("err: ", err);
      console.log("data: ", data);
      var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;
      console.log("url: ", url);

      var image = new Image({
        filename: filename,
        url: url
      });

      image.save(function() {
        mongoose.disconnect();
      })

    });

      console.log("err: ", err);
      console.log('callback:', PIC)
  });
});
