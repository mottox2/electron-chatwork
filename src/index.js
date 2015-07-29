var remote = require('remote');
var app = remote.require('app');

var webview = document.getElementById('mainWebview');
var title = "";
var unreadCount = "";
var timer = setInterval(function() {
  title = webview.getTitle();
  var result = title.match(/\((\d+)\)/); 
  if(result) {
    unreadCount = result[1];
  } else {
    unreadCount = "";
  }
  app.dock.setBadge(unreadCount);
}, 2000);

webview.addEventListener('new-window', function(e) {
  require('shell').openExternal(e.url);
});
