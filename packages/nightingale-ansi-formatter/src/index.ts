import ansi, { EscapeCodePair } from 'ansi-styles';
import { Styles, Record } from 'nightingale-types';
import { styleToHexColor, formatRecordToString } from 'nightingale-formatter';

declare module 'ansi-styles' {
  export const color: {
    close: string;
    ansi256: {
      hex: (hex: string) => string;
    };
  };
}

interface AnsiStyles {
  [key: string]: EscapeCodePair | undefined;
}

const ansiStyles: AnsiStyles = {
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
  orange: { open: ansi.color.ansi256.hex(styleToHexColor.orange), close: ansi.color.close },
  'gray-light': {
    open: ansi.color.ansi256.hex(styleToHexColor['gray-light']),
    close: ansi.color.close,
  },
};

export function style(styles: Styles, string: string) {
  if (!styles || !styles.length || !string) {
    return string;
  }

  return styles.reduce((string: string, styleName: string) => {
    const style: EscapeCodePair | undefined = ansiStyles[styleName];

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
export default function format<T>(record: Record<T>) {
  return formatRecordToString(record, style);
}
