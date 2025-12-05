const { app, BrowserWindow } = require('electron');
const path = require('path'); // [新增] 引入 path 模組

function createWindow() {
    
    // 1. 取得執行檔名稱 (例如 "SRW_Game.exe" 或 "SRW_Admin_Edition.exe")
    const exeName = path.basename(process.execPath).toLowerCase();
    
    // 2. 檢查各種條件
    const isDev = !app.isPackaged;                         // 是否為開發環境
    const hasFlag = process.argv.includes('--admin');      // 是否有 --admin 參數
    const isNameAdmin = exeName.includes('admin');         // [新增] 檔名是否包含 "admin"

    let mode = 'player';
    let showMenuBar = true;

    if (isDev || hasFlag || isNameAdmin) {
        mode = 'admin';
        showMenuBar = false
    }

    console.log(`Executable: ${exeName}`);
    console.log(`Starting game in mode: ${mode}`);

    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        resizable: false,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false 
        },
        autoHideMenuBar: showMenuBar
    });


    // 傳遞參數給 HTML
    mainWindow.loadFile('srw_3d.html', { query: { mode: mode } });
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