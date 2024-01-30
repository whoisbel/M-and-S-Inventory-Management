const next = require("next");
const { app, BrowserWindow } = require("electron");
const serve = require("electron-serve");
const { createServer, request } = require("http");
const path = require("path");
const { parse } = require("url");

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

const nextApp = next({ dev: false, dir: app.getAppPath() });
handle = nextApp.getRequestHandler();

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  await nextApp.prepare();
  if (app.isPackaged) {
    const port = process.argv[2] || 3000;
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
    win.loadURL(`http://localhost:${port}`);
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
