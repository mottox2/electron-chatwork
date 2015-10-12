var ipc = require('ipc');
var box = document.getElementById('box');
var $ = jQuery = require("./jquery-2.1.4.min.js");

ipc.on('keep:register', function(args) {
  var elm = $("<pre>").html(args.message);
  $('#box').prepend(elm);
});
