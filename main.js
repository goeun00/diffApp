// main.js
const { app, BrowserWindow, ipcMain, Menu, shell } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 450,
    minWidth: 480,
    minHeight: 450,
    frame: false,
    transparent: true,
    title: "🐱",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true, // ✅ 보안 필수
      nodeIntegration: false, // ✅ 보안 필수
    },
  });

  //   전역메뉴바 제거
  Menu.setApplicationMenu(null);

  //  dev 모드
  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(path.join(__dirname, "renderer/dist/index.html"));
  }

  ipcMain.on("window-minimize", () => {
    win.minimize();
  });
  ipcMain.on("window-maximize", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.on("window-close", () => {
    win.close();
  });
  ipcMain.on("window-ontop", (_event, flag) => {
    win.setAlwaysOnTop(!!flag);
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 윈도우에서 모든 창 닫히면 종료
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("web-contents-created", (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // http/https 링크는 외부 브라우저로 열기
    if (url.startsWith("http")) {
      shell.openExternal(url);
      return { action: "deny" }; // 앱 내부에선 안 열리게 막음
    }
    return { action: "allow" };
  });
  contents.on("will-navigate", (event, url) => {
    if (url.startsWith("http")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
});
