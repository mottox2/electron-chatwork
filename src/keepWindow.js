var BrowserWindow = require('browser-window');
var shell = require('shell');

export default class KeepWindow {
  constructor() {
    this.window = new BrowserWindow({
      width: 800,
      height: 1000,
      x: 0,
      y: 0
    });
    this.window.loadUrl('file://' + __dirname + '/keep.html');
    this.window.openDevTools(true);
    this.window.webContents.on('new-window', function(event, url) {
      shell.openExternal(url);
      event.preventDefault();
    })
  }
}
