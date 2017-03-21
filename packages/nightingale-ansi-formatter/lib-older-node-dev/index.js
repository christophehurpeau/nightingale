'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = style;
exports.default = format;

var _ansiStyles = require('ansi-styles');

var _ansiStyles2 = _interopRequireDefault(_ansiStyles);

var _nightingaleFormatter = require('nightingale-formatter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ansiStyles = {
  black: _ansiStyles2.default.black,
  red: _ansiStyles2.default.red,
  green: _ansiStyles2.default.green,
  yellow: _ansiStyles2.default.yellow,
  blue: _ansiStyles2.default.blue,
  magenta: _ansiStyles2.default.magenta,
  cyan: _ansiStyles2.default.cyan,
  white: _ansiStyles2.default.white,
  gray: _ansiStyles2.default.gray,

  bgBlack: _ansiStyles2.default.bgBlack,
  bgRed: _ansiStyles2.default.bgRed,
  bgGreen: _ansiStyles2.default.bgGreen,
  bgYellow: _ansiStyles2.default.bgYellow,
  bgBlue: _ansiStyles2.default.bgBlue,
  bgMagenta: _ansiStyles2.default.bgMagenta,
  bgCyan: _ansiStyles2.default.bgCyan,
  bgWhite: _ansiStyles2.default.bgWhite,

  bold: _ansiStyles2.default.bold,
  underline: _ansiStyles2.default.underline,

  // http://www.calmar.ws/vim/256-xterm-24bit-rgb-color-chart.html
  orange: { open: _ansiStyles2.default.color.ansi256.hex(_nightingaleFormatter.styleToHexColor.orange), close: _ansiStyles2.default.color.close },
  'gray-light': { open: _ansiStyles2.default.color.ansi256.hex(_nightingaleFormatter.styleToHexColor['gray-light']), close: _ansiStyles2.default.color.close }
};

function style(styles, string) {
  if (!styles || !styles.length || !string) {
    return string;
  }

  return styles.reduce(function (string, styleName) {
    var style = ansiStyles[styleName];

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
  return (0, _nightingaleFormatter.formatRecordToString)(record, style);
}

// export style function
format.style = style;
//# sourceMappingURL=index.js.map