var BrowserWindow = require('browser-window');
var shell = require('shell');

export default class MainWindow {
  constructor() {
    this.window = new BrowserWindow({
      width: 1480,
      height: 800,
      preload: __dirname + '/index.js',
      "zoom-factor": 0.9
    });
    this.window.loadUrl('https://www.chatwork.com/');
    this.window.openDevTools(true);
    this.window.webContents.on('new-window', function(event, url) {
      shell.openExternal(url);
      event.preventDefault();
    })
  }
}
