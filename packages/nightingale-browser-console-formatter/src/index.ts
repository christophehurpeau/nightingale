import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';
import type { LogRecord, Styles } from 'nightingale-types';

export const style = (args: string[]) => (
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

export default function format<T>(record: LogRecord<T>): string[] {
  const args: string[] = [];
  const string = formatRecordToString(record, style(args));
  return [string, ...args];
}
