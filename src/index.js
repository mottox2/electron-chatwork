var remote = require('remote');
var app = remote.require('app');

var title = "";
var unreadCount = "";
var timer = setInterval(function() {
  title = document.title 
  var result = title.match(/\((\d+)\)/); 
  if(result) {
    unreadCount = result[1];
  } else {
    unreadCount = "";
  }
  app.dock.setBadge(unreadCount);
}, 2000);
