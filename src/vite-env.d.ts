/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare type BasicColorMode = "light" | "dark";
declare type BasicColorSchema = BasicColorMode | "system";

interface Window {
  darkMode: {
    getTheme: () => Promise<BasicColorSchema>;
    setTheme: (theme: BasicColorSchema) => Promise<any>;
    onThemeSwitch: (callback: (event: any, value: BasicColorSchema) => void) => void;
  };
}
