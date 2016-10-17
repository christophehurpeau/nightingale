import hexColors from './styleToHexColor';

export default {
  get reset() {
    throw new Error();
  },

  // text style
  bold: { open: 'font-weight: bold', close: 'font-weight: normal' },
  italic: { open: 'font-style: italic', close: 'font-style: normal' },
  underline: { open: 'text-decoration: underline', close: 'text-decoration: none' },
  inverse: {
    open: 'unicode-bidi: bidi-override; direction: rtl',
    close: 'unicode-bidi: normal; direction: ltr'
  },
  strikethrough: { open: 'text-decoration: line-through', close: 'text-decoration: none' },

  black: { open: 'color: black', close: 'color: initial' },
  red: { open: 'color: red', close: 'color: initial' },
  green: { open: 'color: green', close: 'color: initial' },
  yellow: { open: 'color: yellow', close: 'color: initial' },
  blue: { open: 'color: #4682B4', close: 'color: initial' },
  magenta: { open: 'color: magenta', close: 'color: initial' },
  cyan: { open: 'color: cyan', close: 'color: initial' },
  white: { open: 'color: white', close: 'color: initial' },
  gray: { open: 'color: gray', close: 'color: initial' },

  bgBlack: { open: 'background: black', close: 'background: initial' },
  bgRed: { open: 'background: red', close: 'background: initial' },
  bgGreen: { open: 'background: green', close: 'background: initial' },
  bgYellow: { open: 'background: yellow', close: 'background: initial' },
  bgBlue: { open: 'background: blue', close: 'background: initial' },
  bgMagenta: { open: 'background: magenta', close: 'background: initial' },
  bgCyan: { open: 'background: cyan', close: 'background: initial' },
  bgWhite: { open: 'background: white', close: 'background: initial' },

  orange: { open: `color: #${ hexColors.orange }`, close: 'color: initial' },
  grayLight: { open: `color: #${ hexColors.grayLight }`, close: 'color: initial' },
  'gray-light': { open: `color: #${ hexColors.grayLight }`, close: 'color: initial' }
};
//# sourceMappingURL=styleToHtmlStyle.js.map