// Modules to control application life and create native browser window
import { app, ipcMain, BrowserWindow } from 'electron';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    // TODO カーソル問題
    //titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
      // navigateOnDragDrop: true
      // webSecurity: false
    }
  });

  console.log('===== start =====');
  // and load the index.html of the app.
  // mainWindow.loadFile('./dist/index.html');
  // mainWindow.loadFile(`file://${__dirname}/index.html`);
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });


  mainWindow.on('drop', function() {
    console.log('addEventListener drop');
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('drop-file1', (event, arg) => {
  event.sender.send('reply1', arg);
});

ipcMain.on('drop-file2', (event, arg) => {
  event.sender.send('reply2', arg);
});

ipcMain.on('dragging', (event, arg) => {
  event.sender.send('reply3', arg);
});

ipcMain.on('leaving', (event, arg) => {
  event.sender.send('reply3', '');
});


