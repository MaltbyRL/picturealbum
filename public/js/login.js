'use strict';
$(document).ready(init)

function init (){

}

var $email, $password;

$(function() {
  $email = $('#email');
  $password = $('#password');

  $('form').on('submit', loginUser);
});

function loginUser(e) {
  e.preventDefault();

  var email = $email.val();
  var password = $password.val();

  $.post('/users/login', {email: email, password: password})
  .success(function(data) {
    console.log('data:', data);
    hideLinks()


  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('erir:', err);
  });
}

function hideLinks(){
  console.log('hiding links')
  $('#register').hide()
  $('#login').hide()
  $('#logout').show()
  location.href = '/';
}
