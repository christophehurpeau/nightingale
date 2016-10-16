import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';

/**
 * @param {Object} record
 * @returns {Array}
 */
export default function format(record) {
  const args = [];
  const string = formatRecordToString(record, (styles, string) => {
    if (!styles || !styles.length || !string) {
      return string;
    }

    args.push(['reset'].concat(styles).map(styleName => styleToHtmlStyle[styleName]).join('; '));
    args.push(styleToHtmlStyle.reset);
    return `%c${string}%c`;
  });

  return [string, args];
}
