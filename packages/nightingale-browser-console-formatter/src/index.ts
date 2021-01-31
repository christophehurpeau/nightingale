import {
  formatRecordToString,
  styleToHtmlStyleThemeLight,
  styleToHtmlStyleThemeDark,
  StyleToHtmlStyle,
} from 'nightingale-formatter';
import type { LogRecord, Metadata, Styles } from 'nightingale-types';

export const style = (styleToHtmlStyle: StyleToHtmlStyle, args: string[]) => (
  styles: Styles,
  string: string,
): string => {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  const htmlStyles = styles.map((styleName) => styleToHtmlStyle[styleName]);
  args.push(htmlStyles.map((s) => s.open).join('; '));
  args.push(htmlStyles.map((s) => s.close).join('; '));
  return `%c${string}%c`;
};

export function createBrowserConsoleFormatter(
  theme: 'light' | 'dark' = 'light',
): <T extends Metadata>(record: LogRecord<T>) => string[] {
  const styleToHtmlStyle: StyleToHtmlStyle =
    theme === 'dark' ? styleToHtmlStyleThemeDark : styleToHtmlStyleThemeLight;
  return function format<T extends Metadata>(record: LogRecord<T>): string[] {
    const args: string[] = [];
    const string = formatRecordToString(record, style(styleToHtmlStyle, args));
    return [string, ...args];
  };
}

/** @deprecated use createBrowserConsoleFormatter */
export default createBrowserConsoleFormatter('light');
