const { app, BrowserWindow } = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1920,      // 設定固定寬度 (包含地圖和選單)
        height: 1080,      // 設定固定高度
        resizable: false, // 關鍵：禁止使用者調整視窗大小
        useContentSize: true, // 確保內容區域大小符合 width/height
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false  // 允許讀取本地圖片資源
        },
        autoHideMenuBar: true
    });

    mainWindow.loadFile('srw_3d.html');
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});