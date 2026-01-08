// preload.js
const { contextBridge, ipcRenderer, shell } = require("electron");

contextBridge.exposeInMainWorld("winControl", {
  toggleMini: () => ipcRenderer.send("toggle-mini-mode"),
  onMiniMode: (cb) => ipcRenderer.on("mini-mode", (_, flag) => cb(flag)),
  minimize: () => ipcRenderer.send("window-minimize"),
  close: () => ipcRenderer.send("window-close"),
  onTop: (flag) => ipcRenderer.send("window-ontop", flag),
});
