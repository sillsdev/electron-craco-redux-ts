const { app, ipcMain } = require('electron');

const createAppWindow = require('./app-process');
const { createAuthWindow, createLogoutWindow } = require('./auth-process');
const authService = require('./auth-service');

async function showWindow() {
  try {
    await authService.refreshTokens();
    return createAppWindow();
  } catch (err) {
    createAuthWindow();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', showWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('get-profile', () => {
  return authService.getProfile();
});

ipcMain.handle('logout', () => {
  createLogoutWindow();
});
