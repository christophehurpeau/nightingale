import ansi from "ansi-styles";
import type { NightingaleFormatter } from "nightingale";
import type { Styles } from "nightingale-types";
import {
  formatRecordToString,
  styleToHexColor,
} from "../formatter-utils/index.ts";

export type { Styles } from "nightingale-types";

interface CodePair {
  open: string;
  close: string;
}

type AnsiStyles = Record<string, CodePair | undefined>;

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
  dim: ansi.dim,

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
    open: ansi.color.ansi256(ansi.hexToAnsi256(styleToHexColor.orange)),
    close: ansi.color.close,
  },
};

export function style(styles: Styles, string: string): string {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  return styles.reduce((styledString: string, styleName: string) => {
    const codePair: CodePair | undefined = ansiStyles[styleName];

    if (!codePair) {
      throw new Error(`Unknown style: ${styleName}`);
    }

    return codePair.open + styledString + codePair.close;
  }, string);
}

export const ANSIFormatter: NightingaleFormatter = {
  format: (record) => formatRecordToString(record, style),
};
