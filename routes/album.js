'use strict';

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();
require('dotenv').config();
var aws = require('aws-sdk');
var uuid = require('node-uuid');
var s3 = new aws.S3();
var fs = require('fs');
var mongoose = require('mongoose');

var Image = require('../models/image')
var multer = require('multer');
var upload = multer({
  storage: multer.memoryStorage()
});

var Image = mongoose.model('Image' , {
  url: String
});

var authMiddleware = require('../config/auth');




router.get('/', function(req, res, next){
  res.render('album')
});


router.post('/', upload.array('images'), function(req, res) {

  console.log("req.files:", req.files);
  var key = uuid.v1();
  var params = {
    Bucket:process.env.AWS_BUCKET,
    Key:key,
    Body: req.files[0].buffer
  }
  s3.putObject(params, function(err, data) {
    if(err) return console.log("errr: ", err)
    console.log("data: ", data)
    var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;
    console.log("view image", url)

    var image = new Image({
      url: url
    });
    console.log('Image: ', image )
    image.save(function() {
       console.log("AAAAAAAAH what is this thing:", image)

      res.render("image", {imageURL: image.url});
    })


 });
});
module.exports = router;
