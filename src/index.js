var remote = require('remote');
var app = remote.require('app');
var ipc = require('ipc');

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


window.onload = function(){
  var renderTimeLine = TimeLineView.prototype.renderTimeLine;
  TimeLineView.prototype.renderTimeLine = function (a, b) {
    renderTimeLine.apply(TimeLineView, [a, b]);

    $('._message').each(function(i, message) {
      var mid = $(this).data('mid');
      var content = $(this).find('pre').html();
      $(message).find('._timeStamp').click(function() {
        $(this).css('background', 'red');
        ipc.send('keep:click', {
          message: content
        });
      });
    });
  };
}
