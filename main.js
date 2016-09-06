const path = require('path');
const electron = require('electron');

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

const debug = /--debug/.test(process.argv[2]);

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

    // Launch full screen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools();
      mainWindow.maximize();
    }

    mainWindow.on('closed', function () {
      mainWindow = null
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
}

initialize();
