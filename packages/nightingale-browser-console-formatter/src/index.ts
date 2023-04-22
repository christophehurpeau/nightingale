import type { StyleToHtmlStyle } from 'nightingale-formatter';
import {
  formatRecordToString,
  styleToHtmlStyleThemeLight,
  styleToHtmlStyleThemeDark,
} from 'nightingale-formatter';
import type { LogRecord, Metadata, Styles } from 'nightingale-types';

export const style =
  (styleToHtmlStyle: StyleToHtmlStyle, args: string[]) =>
  (styles: Styles, string: string): string => {
    if (!styles || styles.length === 0 || !string) {
      return string;
    }

    const htmlStyles = styles.map((styleName) => styleToHtmlStyle[styleName]);
    args.push(
      htmlStyles.map((s) => s.open).join('; '),
      htmlStyles.map((s) => s.close).join('; '),
    );
    return `%c${string}%c`;
  };

export function createBrowserConsoleFormatter(
  theme: 'dark' | 'light' = 'light',
): <T extends Metadata>(record: LogRecord<T>) => string[] {
  const styleToHtmlStyle: StyleToHtmlStyle =
    theme === 'dark' ? styleToHtmlStyleThemeDark : styleToHtmlStyleThemeLight;
  return function format<T extends Metadata>(record: LogRecord<T>): string[] {
    const args: string[] = [];
    const string = formatRecordToString(record, style(styleToHtmlStyle, args));
    return [string, ...args];
  };
}
