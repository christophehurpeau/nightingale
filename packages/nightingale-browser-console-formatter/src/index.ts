import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';
import { Record, Styles } from 'nightingale-types';

export const style = (args: Array<string>) => (
  styles: Styles,
  string: string,
) => {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  const htmlStyles = styles.map((styleName) => styleToHtmlStyle[styleName]);
  args.push(htmlStyles.map((s) => s.open).join('; '));
  args.push(htmlStyles.map((s) => s.close).join('; '));
  return `%c${string}%c`;
};

/**
 * @param {Object} record
 * @returns {Array}
 */
export default function format<T>(record: Record<T>) {
  const args: Array<string> = [];
  const string = formatRecordToString(record, style(args));
  return [string, ...args];
}
