'use strict';
$(document).ready(init)

function init(){
  console.log('Initiated')
}

$.post('/users/changepw', {email: email, oldPassword: oldpassword, newPassword: newpassword})
.success(function(data) {
  location.href = '/';
})
.fail(function(err) {
  alert('Error.  Check console.');
  console.log('err:', err);
});
}
