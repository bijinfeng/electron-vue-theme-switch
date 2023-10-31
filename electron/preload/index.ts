import { contextBridge, ipcRenderer } from "electron";
import { ThemeColor } from "../types";

contextBridge.exposeInMainWorld("darkMode", {
  getTheme: () => ipcRenderer.invoke("dark-mode:get-theme"),
  setTheme: (theme: ThemeColor) =>
    ipcRenderer.invoke("dark-mode:set-theme", theme),
  onThemeSwitch: (callback) => ipcRenderer.on("theme-switch", callback),
});
