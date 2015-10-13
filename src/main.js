'use strict';

var app = require('app');
var Menu = require('menu');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

require('crash-reporter').start();

var mainWindow = null;
var keepWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1480,
    height: 800,
    preload: __dirname + '/index.js',
    "zoom-factor": 0.9
  });
  mainWindow.loadUrl('https://www.chatwork.com/');
  mainWindow.openDevTools(true);

  mainWindow.on('closed', function() {
    mainWindow = null;
    app.quit();
  });

  mainWindow.webContents.on('will-navigate', function(e) {
    e.preventDefault()
  });

  keepWindow = new BrowserWindow({
    width: 800,
    height: 1000,
    x: 0,
    y: 0
  });
  keepWindow.loadUrl('file://' + __dirname + '/keep.html');
  keepWindow.openDevTools(true);

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
            click: function() { mainWindow.restart(); }
      },
      {
            label: 'Reload',
            accelerator: 'Shift+Command+R',
            click: function() { keepWindow.restart(); }
      },
      {
        label: 'デベロッパーツール',
        accelerator: 'Alt+Command+I',
        click: function() { mainWindow.toggleDevTools(); }
      },
    ]});
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  keepWindow.webContents.on('did-finish-load', function() {
    ipc.on('keep:click', function(event, arg) {
      keepWindow.webContents.send('keep:register', arg);
    });

    ipc.on('loadurl', function(event, args) {
      mainWindow.loadUrl(args.url);
      mainWindow.focus();
    });
  });
});
