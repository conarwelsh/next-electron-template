const path = require("path")
const { format } = require("url")

const { BrowserWindow, app, ipcMain } = require("electron")
const isDev = require("electron-is-dev")
const prepareNext = require("electron-next")

app.on("window-all-closed", app.quit)

app.on("ready", async () => {
  await prepareNext("./src")

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  })

  const url = isDev
    ? "http://localhost:8000"
    : format({
        pathname: path.join(__dirname, "../../dist/compiled/index.html"),
        protocol: "file:",
        slashes: true,
      })

  mainWindow.loadURL(url)
  mainWindow.webContents.openDevTools()
})
