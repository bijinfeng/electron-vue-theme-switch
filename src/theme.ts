import { ref } from 'vue';

export const theme = ref<BasicColorSchema>("system");

const checkSystemDark = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const checkDark = (colorSchema: BasicColorSchema) => {
  if (colorSchema === "system") {
    return checkSystemDark();
  }
  return colorSchema === "dark";
};

export const setThemeClass = (colorSchema: BasicColorSchema) => {
  theme.value = colorSchema;
  const domTarget = document.querySelector("html");
  domTarget?.classList.remove("dark", "light");
  domTarget?.classList.add(checkDark(colorSchema) ? 'dark' : 'light');
};

export const setTheme = (colorSchema: BasicColorSchema) => {
  window.darkMode.setTheme(colorSchema);
};
