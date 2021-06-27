import ansi from 'ansi-styles';
import { formatRecordToString, styleToHexColor } from 'nightingale-formatter';

var ansiStyles = {
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
    open: ansi.color.ansi256.hex(styleToHexColor.orange),
    close: ansi.color.close
  },
  'gray-light': {
    open: ansi.color.ansi256.hex(styleToHexColor['gray-light']),
    close: ansi.color.close
  }
};
function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  return styles.reduce(function (string, styleName) {
    var style = ansiStyles[styleName];

    if (!style) {
      throw new Error("Unknown style: " + styleName);
    }

    return style.open + string + style.close;
  }, string);
}
/**
 * @param {Object} record
 * @returns {string}
 */

function ansiFormat(record) {
  return formatRecordToString(record, style);
}

export default ansiFormat;
export { style };
//# sourceMappingURL=index-browser.es.js.map
