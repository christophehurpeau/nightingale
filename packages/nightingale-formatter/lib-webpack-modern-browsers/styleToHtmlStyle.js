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
  red: { open: 'color: #ff0020', close: 'color: initial' },
  green: { open: 'color: #00b317', close: 'color: initial' },
  yellow: { open: 'color: #ffcc00', close: 'color: initial' },
  blue: { open: 'color: #00a0ff', close: 'color: initial' },
  magenta: { open: 'color: #ff00a0', close: 'color: initial' },
  cyan: { open: 'color: #00cfd8', close: 'color: initial' },
  white: { open: 'color: white', close: 'color: initial' },
  gray: { open: 'color: gray', close: 'color: initial' },

  bgBlack: { open: 'background: black', close: 'background: initial' },
  bgRed: { open: 'background: #ff0020', close: 'background: initial' },
  bgGreen: { open: 'background: #00b317', close: 'background: initial' },
  bgYellow: { open: 'background: #ffcc00', close: 'background: initial' },
  bgBlue: { open: 'background: #00a0ff', close: 'background: initial' },
  bgMagenta: { open: 'background: #ff00a0', close: 'background: initial' },
  bgCyan: { open: 'background: #00cfd8', close: 'background: initial' },
  bgWhite: { open: 'background: white', close: 'background: initial' },

  orange: { open: `color: #${hexColors.orange}`, close: 'color: initial' },
  grayLight: { open: `color: #${hexColors.grayLight}`, close: 'color: initial' },
  'gray-light': { open: `color: #${hexColors.grayLight}`, close: 'color: initial' }
};
//# sourceMappingURL=styleToHtmlStyle.js.map