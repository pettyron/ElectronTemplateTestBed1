import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            devTools: true
        },
    });

    console.log("env: ", process.env.ELECTRON_START_URL)

    mainWindow.loadURL("http://localhost:4000");
    /**
     * url.format({
            pathname: path.join(__dirname, "../renderer/index.html"),
            protocol: 'file:',
            slashes: true
        })
     */

    mainWindow.webContents.openDevTools({ mode: "undocked" });
    // mainWindow.webContents.loadFile("./build/index.html");

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;
