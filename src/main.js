'use strict';

var app = require('app');
var Menu = require('menu');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 800,
    preload: __dirname + '/index.js',
    "zoom-factor": 0.9
  });
  mainWindow.loadUrl('https://www.chatwork.com/');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.webContents.on('will-navigate', function(e) {
    e.preventDefault()
  });

  var template = [
    {
      label: "Application",
      submenu: [
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]
    },
    {
      label: "編集",
      submenu: [
          { label: "取り消す", accelerator: "Command+Z", selector: "undo:" },
          { label: "やり直す", accelerator: "Shift+Command+Z", selector: "redo:" },
          { type: "separator" },
          { label: "切り取り", accelerator: "Command+X", selector: "cut:" },
          { label: "コピー", accelerator: "Command+C", selector: "copy:" },
          { label: "貼り付け", accelerator: "Command+V", selector: "paste:" },
          { label: "すべてを選択", accelerator: "Command+A", selector: "selectAll:" }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});
