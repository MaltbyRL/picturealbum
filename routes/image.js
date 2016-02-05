'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
  storage: multer.memoryStorage()
});

router.post('/album',  function(req, res) {
  console.log("req.files:", req.files);
  // console.log("res:", res);
  async.each(req.files, function(file, cb) {
    console.log("routes/image.js :",file)
  //   s3.putObject(..., function() {
  //
  //     ...
  //     image.save(function(err){
  //       cb(err)
  //     });
  //   });
  // }, function(err) {
    // res.send();
  });
  res.redirect('album')
})

module.exports = router;
