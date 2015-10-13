var ipc = require('ipc');
var box = document.getElementById('box');
var $ = jQuery = require("./jquery-2.1.4.min.js");

ipc.on('keep:register', function(args) {
  console.log(args);
  var box = $('<div>').addClass('message');

  var avatar = $('<img>').attr({
    src: args.accountAvatar,
    width: 50
  }).addClass('messageAvatar')
  var messageArea = $('<div>').addClass('messageArea');
  var account = $('<div>').text(args.accountName).addClass('messageAccount');
  var content = $('<pre>').html(args.message).addClass('messageContent');
  var room = $('<div>').text('このメッセージに移動').addClass('messageRoom');
  var remove = $('<div>').text('リストから削除').addClass('messageRemove');
  messageArea.append(account);
  messageArea.append(content);
  messageArea.append(room);
  messageArea.append(remove);
  var time = $('<div>').text(args.send_time).addClass('messageSendTime');
  box.append(avatar);
  box.append(messageArea);
  box.append(time);
  box.prependTo('#box').hide().slideDown(300);

  room.on('click', function() {
    ipc.send('loadurl', {
      url: 'https://www.chatwork.com/#!rid' + args.rid + '-' + args.mid
    });
  });

  remove.on('click', function() {
    $(this).parent().parent().remove();
  });
});
