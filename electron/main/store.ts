import { nativeTheme } from "electron";
import Store from "electron-store";

type ThemeColor = typeof nativeTheme.themeSource;

const store = new Store<{ theme: ThemeColor }>({
  defaults: {
    theme: "system",
  },
});

export const getThemeStore = () => store.get("theme");

export const setThemeStore = (theme: ThemeColor) => store.set("theme", theme);
