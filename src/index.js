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
      var $self = $(this);
      $(message).find('._timeStamp').click(function() {
        $(this).css('background', 'red');
        ipc.send('keep:click', {
          rid: $self.data('rid'),
          mid: $self.data('mid'),
          accountName: $self.find('.chatName').text(),
          accountAvatar: $self.find('._avatar').attr('src'),
          message: $self.find('pre').html(),
          send_time: $(this).text()
        });
      });
    });
  };
}
