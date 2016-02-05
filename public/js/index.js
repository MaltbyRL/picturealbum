'use strict';

$(document).ready(init)

function init(){
  $('#next').on('click', myAlbum)
}
function myAlbum(){
  location.href = '/album';
}
