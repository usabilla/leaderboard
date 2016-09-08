const path = require('path');
const electron = require('electron');

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

const debug = /--debug/.test(process.argv[2]);

if (debug) {
  require('electron-reload')('dist/**/*.{js,css}');
}

var mainWindow = null;

function initialize () {
  function createWindow () {
    var windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      title: app.getName()
    };

    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));

    // Launch full screen with DevTools open, usage: npm start
    if (debug) {
      mainWindow.webContents.openDevTools();
    }

    // Always open window maximized
    mainWindow.maximize();

    mainWindow.on('closed', function () {
      mainWindow = null
    });

    mainWindow.on('unresponsive', function (err) {
      // Un-responsive handling
      console.log(err);
    });

    mainWindow.webContents.on('crashed', function (err) {
      // Crash handling
      console.log(err);
    });
  }

  app.on('ready', function () {
    createWindow();
  });

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', function () {
    if (mainWindow === null) {
      createWindow();
    }
  });

  process.on('uncaughtException', function (err) {
    // uncaughtException handling
    console.log(err);
  })
}

initialize();
