const { BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createAppWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    title: 'Boilerplate',
    icon: path.join(__dirname, '../src/assets/icons/favicon.ico'),
    webPreferences: { nodeIntegration: true, webSecurity: false },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => (mainWindow = null));
}

module.exports = createAppWindow;
