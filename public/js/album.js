"use strict";
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

mongoose.connect('mongodb://localhost/imageupload', function(err) {
  if(err) return console.log("err:" , err);
  var filename = $("#image").val()

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
