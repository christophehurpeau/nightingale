'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ansi = _interopDefault(require('ansi-styles'));
var nightingaleFormatter = require('nightingale-formatter');

const ansiStyles = {
  black: ansi.black,
  red: ansi.red,
  green: ansi.green,
  yellow: ansi.yellow,
  blue: ansi.blue,
  magenta: ansi.magenta,
  cyan: ansi.cyan,
  white: ansi.white,
  gray: ansi.gray,
  bgBlack: ansi.bgBlack,
  bgRed: ansi.bgRed,
  bgGreen: ansi.bgGreen,
  bgYellow: ansi.bgYellow,
  bgBlue: ansi.bgBlue,
  bgMagenta: ansi.bgMagenta,
  bgCyan: ansi.bgCyan,
  bgWhite: ansi.bgWhite,
  bold: ansi.bold,
  underline: ansi.underline,
  // http://www.calmar.ws/vim/256-xterm-24bit-rgb-color-chart.html
  orange: {
    open: ansi.color.ansi256.hex(nightingaleFormatter.styleToHexColor.orange),
    close: ansi.color.close
  },
  'gray-light': {
    open: ansi.color.ansi256.hex(nightingaleFormatter.styleToHexColor['gray-light']),
    close: ansi.color.close
  }
};
function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

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

exports.style = style;
exports.default = format;
//# sourceMappingURL=index-node8.cjs.js.map
