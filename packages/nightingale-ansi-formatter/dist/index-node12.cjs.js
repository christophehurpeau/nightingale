'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const ansi = require('ansi-styles');
const nightingaleFormatter = require('nightingale-formatter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const ansi__default = /*#__PURE__*/_interopDefaultLegacy(ansi);

const ansiStyles = {
  black: ansi__default.black,
  red: ansi__default.red,
  green: ansi__default.green,
  yellow: ansi__default.yellow,
  blue: ansi__default.blue,
  magenta: ansi__default.magenta,
  cyan: ansi__default.cyan,
  white: ansi__default.white,
  gray: ansi__default.gray,
  bgBlack: ansi__default.bgBlack,
  bgRed: ansi__default.bgRed,
  bgGreen: ansi__default.bgGreen,
  bgYellow: ansi__default.bgYellow,
  bgBlue: ansi__default.bgBlue,
  bgMagenta: ansi__default.bgMagenta,
  bgCyan: ansi__default.bgCyan,
  bgWhite: ansi__default.bgWhite,
  bold: ansi__default.bold,
  underline: ansi__default.underline,
  // http://www.calmar.ws/vim/256-xterm-24bit-rgb-color-chart.html
  orange: {
    open: ansi__default.color.ansi256.hex(nightingaleFormatter.styleToHexColor.orange),
    close: ansi__default.color.close
  },
  'gray-light': {
    open: ansi__default.color.ansi256.hex(nightingaleFormatter.styleToHexColor['gray-light']),
    close: ansi__default.color.close
  }
};
function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  } // eslint-disable-next-line unicorn/no-reduce


  return styles.reduce((string, styleName) => {
    const style = ansiStyles[styleName];

    if (!style) {
      throw new Error(`Unknown style: ${styleName}`);
    }

    return style.open + string + style.close;
  }, string);
}
/**
 * @param {Object} record
 * @returns {string}
 */

function format(record) {
  return nightingaleFormatter.formatRecordToString(record, style);
}

exports.default = format;
exports.style = style;
//# sourceMappingURL=index-node12.cjs.js.map
