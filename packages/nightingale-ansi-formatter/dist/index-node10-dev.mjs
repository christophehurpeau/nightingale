import ansi from 'ansi-styles';
import { formatRecordToString, styleToHexColor } from 'nightingale-formatter';

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
  return formatRecordToString(record, style);
}

export default format;
export { style };
//# sourceMappingURL=index-node10-dev.mjs.map
