import { ref, computed } from "vue";

export type BasicColorMode = "light" | "dark";
export type BasicColorSchema = BasicColorMode | "system";

interface UseThemeOptions {
  /**
   * 目标元素选择器
   * @default 'html'
   */
  selector?: string;
  /**
   * 目标元素修改属性
   *
   * @default 'class'
   */
  attribute?: string;
  /**
   * 初始主题
   * @default 'system'
   */
  initialValue?: BasicColorSchema;
  /**
   * 保存到 localStorage/sessionStorage 中的值对应的 key
   * @default 'color-scheme'
   */
  storageKey?: string;
  /**
   * 存储对象，默认为 localStorage
   * @default localStorage
   */
  storage?: Storage;
  /**
   * 当 isDark=true 时应用于目标元素的值
   *
   * @default 'dark'
   */
  valueDark?: string;

  /**
   * 当 isDark=false 时应用于目标元素的值
   *
   * @default 'light'
   */
  valueLight?: string;
  /**
   * 切换主题时触发的回调函数
   */
  onChanged?: (dark: boolean, mode: BasicColorSchema) => void;
}

export const useTheme = (options: UseThemeOptions = {}) => {
  const {
    selector = "html",
    attribute = "class",
    initialValue = "system",
    storageKey = "color-scheme",
    storage = localStorage,
    valueDark = "dark",
    valueLight = "light",
    onChanged,
  } = options;

  const mode = ref<BasicColorSchema>(initialValue);

  const checkSystemDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const checkDark = (colorSchema: BasicColorSchema) => {
    if (colorSchema === "system") {
      return checkSystemDark();
    }
    return colorSchema === "dark";
  };

  const setThemeClass = (colorSchema: BasicColorSchema) => {
    const _isDark = checkDark(colorSchema);
    const isClass = attribute === "class";
    const domTarget = document.querySelector(selector);
    const valueMode = _isDark ? valueDark : valueLight;

    if (isClass) {
      domTarget?.classList.remove(valueDark, valueLight);
      domTarget?.classList.add(valueMode);
    } else {
      domTarget?.setAttribute(attribute, valueMode);
    }
  };

  const setMode = (_mode: BasicColorSchema) => {
    mode.value = _mode;
    storage.setItem(storageKey, _mode);
    setThemeClass(_mode);
    onChanged?.(checkDark(_mode), _mode);
  };

  const localMode = storage.getItem(storageKey);
  localMode && setMode(localMode as BasicColorSchema);

  const isDark = computed(() => checkDark(mode.value));

  return { isDark, mode, setMode };
};
