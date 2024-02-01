const next = require("next");
const { app, BrowserWindow } = require("electron");
const serve = require("electron-serve");
const { createServer, request } = require("http");
const path = require("path");
const { parse } = require("url");

const startServer = async () => {
  const hostname = "localhost";
  const port = 3000;
  const nextApp = next({ dev: false, hostname, port, dir: app.getAppPath() });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare().then(() => {
    createServer(async (req, res) => {
      try {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);

        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    })
      .once("error", (err) => {
        console.error(err);
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
  });
};

app.on("ready", async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });
  if (app.isPackaged) {
    await startServer();
  } else {
    win.webContents.openDevTools();
  }
  win.loadURL("http://localhost:3000");

  win.webContents.on("did-fail-load", (e, code, desc) => {
    win.webContents.reloadIgnoringCache();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
