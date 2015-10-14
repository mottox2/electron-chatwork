'use strict';
require("babel/register")
var app = require('app');
var Menu = require('menu');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var shell = require('shell');

var MainWindow = require('./mainWindow');
var KeepWindow = require('./keepWindow');

require('crash-reporter').start();

var mainWindow = null;
var keepWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  keepWindow = new KeepWindow();
  keepWindow.window.on('closed', function() {
    keepWindow = null;
  });

  keepWindow.window.webContents.on('did-finish-load', function() {
    mainWindow = new MainWindow();

    mainWindow.window.on('closed', function() {
      mainWindow = null;
      app.quit();
    });

    ipc.on('keep:click', function(event, arg) {
      keepWindow.window.webContents.send('keep:register', arg);
    });

    ipc.on('loadurl', function(event, args) {
      mainWindow.window.loadUrl(args.url);
      mainWindow.window.focus();
    });
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

  template.push({
    label: "開発",
    submenu: [
      {
            label: 'Reload',
            accelerator: 'Command+R',
            click: function() { mainWindow.window.restart(); }
      },
      {
            label: 'Reload',
            accelerator: 'Shift+Command+R',
            click: function() { keepWindow.window.restart(); }
      },
      {
        label: 'デベロッパーツール',
        accelerator: 'Alt+Command+I',
        click: function() { mainWindow.window.toggleDevTools(); }
      },
    ]});
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

});
