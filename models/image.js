'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');


// instance method
var imageSchema = new mongoose.Schema({
  url: String,
});



var Image = mongoose.model('image', imageSchema);

module.exports = Image;
