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

    const buildUrl = url.format({
        pathname: path.join(__dirname, "../renderer/index.html"),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(process.env.ELECTRON_START_URL || buildUrl);
    /**
     * url.format({
            pathname: path.join(__dirname, "../renderer/index.html"),
            protocol: 'file:',
            slashes: true
        })
     */

    mainWindow.webContents.openDevTools({ mode: "undocked" });
    // mainWindow.webContents.loadFile("./build/index.html");

    mainWindow.on("ready-to-show", function (): void {
        mainWindow?.show();
    })

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;
