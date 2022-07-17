const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    closeApp: () => {
        ipcRenderer.send('quit');
    },
    maxApp: (mode) => {
        ipcRenderer.send('max', mode)
    },
    minApp: () => {
        ipcRenderer.send('min')
    },
    getWindowMode_isFull: () => {
        return ipcRenderer.sendSync('isFull');
    },
    getWindowMode_isMax: () => {
        return ipcRenderer.sendSync('isMax');
    },
    getRes: (path) => {
        return ipcRenderer.sendSync('getRes', path);
    }
})