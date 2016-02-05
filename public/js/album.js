'use strict';
$(document).ready(init)

function init(){
  $('form').on('submit', submitPic);
}
function submitPic(data){
  var picTarget = data.delegateTarget.firstElementChild.value
  console.log("data: ",picTarget)
  debugger
  $.post('/users/albumpic', picTarget)
  .success(function() {
    location.href = '/login';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('errr:', err);
  });
}
