const { Console } = require('console');
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const Res = require("./PuModule/PuRes.js")

function CreateWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        frame: false,
        minHeight: 600,
        minWidth: 800,
        icon: "./DATA/image/icon.png",
        

        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    window.loadFile('./index.html');

    window.on('ready-to-show', () => {
        window.show()
    })
}

app.whenReady().then(() => {
    CreateWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().lenght === 0) {
            CreateWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


//---------------------------------------------------------------------------------------------------------------------------------------------//

ipcMain.on('quit', (e) => {
    const win = BrowserWindow.getFocusedWindow();
    win.close();
})
ipcMain.on('max', (e, mode) => {
    const win = BrowserWindow.getFocusedWindow();
    if(mode=='max') {
        win.maximize();
    }
    else if(mode=='normal') {
        win.unmaximize();
    }
    
})
ipcMain.on('min', (e) => {
    const win = BrowserWindow.getFocusedWindow();
    win.minimize();
})

ipcMain.on('isFull', (e) => {
    e.returnValue = BrowserWindow.getFocusedWindow().isFullScreen()
})

ipcMain.on('isMax', (e) => {
    e.returnValue = BrowserWindow.getFocusedWindow().isMaximized()
})

ipcMain.on("getRes", (e, path) => {
    console.log()
    e.returnValue = Res.new(path);
})



