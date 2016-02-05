'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({
  uid: String,
  email: String
});

// instance method
userSchema.methods.generateToken = function() {
  var payload = {
    // console.log('payload running')
    uid: this.uid,
    email: this.email
  };

  var token = jwt.encode(payload, JWT_SECRET);
  console.log('Token:', token)
  // console.log('payload ended');
  return token;
};



var User = mongoose.model('User', userSchema);

module.exports = User;
