import type { LogRecord, Metadata, Styles } from "nightingale-types";
import type { StyleToHtmlStyle } from "nightingale";
import type { NightingaleFormatter } from "../formatter-utils";
import {
  formatRecordToString,
  styleToHtmlStyleThemeDark,
  styleToHtmlStyleThemeLight,
} from "../formatter-utils/index.ts";

export const style =
  (styleToHtmlStyle: StyleToHtmlStyle, args: string[]) =>
  (styles: Styles, string: string): string => {
    if (!styles || styles.length === 0 || !string) {
      return string;
    }

    const htmlStyles = styles.map(
      (styleName) => styleToHtmlStyle[styleName as keyof StyleToHtmlStyle],
    );

    args.push(
      htmlStyles.map((s) => s.open).join("; "),
      htmlStyles.map((s) => s.close).join("; "),
    );
    return `%c${string}%c`;
  };

export class BrowserConsoleFormatter implements NightingaleFormatter {
  styleToHtmlStyle: StyleToHtmlStyle;
  constructor(theme: "dark" | "light" = "light") {
    this.styleToHtmlStyle =
      theme === "dark" ? styleToHtmlStyleThemeDark : styleToHtmlStyleThemeLight;
  }

  format<T extends Metadata>(record: LogRecord<T>): [string, ...string[]] {
    const args: string[] = [];
    const string = formatRecordToString(
      record,
      style(this.styleToHtmlStyle, args),
    )[0];
    return [string, ...args];
  }
}
