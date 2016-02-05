'use strict';
$(document).ready(init)

function init(){
  console.log('Initiated')
}


$.get('/album', function(req, res){
  console.log("resssed: ", res)
})
.success(function(data) {
  console.log("datas's: ", data)
  res.send('sended')
})
.fail(function(err) {
  alert('Error.  Check console.');
  console.log('err:', err);
});
