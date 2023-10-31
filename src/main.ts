import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { setThemeClass } from "./theme";

window.darkMode.getTheme().then((theme) => {
  setThemeClass(theme);

  createApp(App).mount("#app");
});

window.darkMode.onThemeSwitch((_event, value) => {
  setThemeClass(value);
});
