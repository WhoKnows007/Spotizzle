// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

const path = require('path');
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // preload: path.join(app.getAppPath(), 'preload.js')
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    mainWindow.maximize();
    mainWindow.show();

    // and load the index2.html of the app.
    mainWindow.loadFile('index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}


//electron desktop app hotkey
app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+Shift+A', () => {
        // this will add the currently playing song to the awesomium playlist if it has not been added previously.        
        console.log('CommandOrControl+Shift+A is pressed');

        mainWindow.webContents.send('asyncChannelToRenderer', 'addSongToAwesomium')
    });
});

//electron desktop app hotkey
app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+Shift+D', () => {
        // this will remove the currently playing song from the playlist and add it to the no-delete playlist.

        console.log('CommandOrControl+Shift+D is pressed');
        mainWindow.webContents.send('asyncChannelToRenderer', 'removeSongFromAwesomiumandAddSongToNoDeleteAgain')

    });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
    // createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
