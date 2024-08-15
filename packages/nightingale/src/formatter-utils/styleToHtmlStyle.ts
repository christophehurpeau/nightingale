import { styleToHexColor } from "./styleToHexColor";

export interface HtmlStyle {
  readonly open: string;
  readonly close: string;
}

export type StyleToHtmlStyle = Readonly<Record<string, HtmlStyle>>;

export const styleToHtmlStyleThemeLight: StyleToHtmlStyle = {
  // text style
  bold: { open: "font-weight: bold", close: "font-weight: normal" },
  italic: { open: "font-style: italic", close: "font-style: normal" },
  underline: {
    open: "text-decoration: underline",
    close: "text-decoration: none",
  },
  inverse: {
    open: "unicode-bidi: bidi-override; direction: rtl",
    close: "unicode-bidi: normal; direction: ltr",
  },
  strikethrough: {
    open: "text-decoration: line-through",
    close: "text-decoration: none",
  },

  black: { open: "color: black", close: "color: currentcolor" },
  red: { open: "color: #ff0020", close: "color: currentcolor" },
  green: { open: "color: #00b317", close: "color: currentcolor" },
  yellow: { open: "color: #ffcc00", close: "color: currentcolor" },
  blue: { open: "color: #00a0ff", close: "color: currentcolor" },
  magenta: { open: "color: #ff00a0", close: "color: currentcolor" },
  cyan: { open: "color: #00cfd8", close: "color: currentcolor" },
  white: { open: "color: white", close: "color: currentcolor" },
  gray: { open: "color: gray", close: "color: currentcolor" },

  bgBlack: { open: "background: black", close: "background: initial" },
  bgRed: { open: "background: #ff0020", close: "background: initial" },
  bgGreen: { open: "background: #00b317", close: "background: initial" },
  bgYellow: { open: "background: #ffcc00", close: "background: initial" },
  bgBlue: { open: "background: #00a0ff", close: "background: initial" },
  bgMagenta: { open: "background: #ff00a0", close: "background: initial" },
  bgCyan: { open: "background: #00cfd8", close: "background: initial" },
  bgWhite: { open: "background: white", close: "background: initial" },

  orange: {
    open: `color: #${styleToHexColor.orange}`,
    close: "color: currentcolor",
  },
  grayLight: {
    open: `color: #${styleToHexColor.grayLight}`,
    close: "color: currentcolor",
  },
  "gray-light": {
    open: `color: #${styleToHexColor.grayLight}`,
    close: "color: currentcolor",
  },
};

export const styleToHtmlStyleThemeDark: StyleToHtmlStyle = {
  ...styleToHtmlStyleThemeLight,
  black: styleToHtmlStyleThemeLight.white,
  bgBlack: styleToHtmlStyleThemeLight.bgWhite,
  white: styleToHtmlStyleThemeLight.black,
  bgWhite: styleToHtmlStyleThemeLight.bgBlack,
  gray: { open: "color: lightgray", close: "color: currentcolor" },
};
