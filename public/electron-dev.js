const { app, BrowserWindow, ipcMain } = require('electron');

const createAppWindow = require('./app-process');
const { createAuthWindow, createLogoutWindow } = require('./auth-process');
const authService = require('./auth-service');

//ToDo: Remove thiss and follow instructions here:
//https://github.com/electron/electron/blob/master/docs/tutorial/security.md#electron-security-warnings
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

async function showWindow() {
  try {
    await authService.refreshTokens();
    const path = require('path');
    const os = require('os');
    BrowserWindow.addDevToolsExtension(
      path.join(
        os.homedir(),
        '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.7.0_0'
      )
    );
    BrowserWindow.addDevToolsExtension(
      path.join(
        os.homedir(),
        '/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0'
      )
    );
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
