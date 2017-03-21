import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';

export const style = function style(args) {
  return function (styles, string) {
    if (!styles || !styles.length || !string) {
      return string;
    }

    const htmlStyles = styles.map(function (styleName) {
      return styleToHtmlStyle[styleName];
    });
    args.push(htmlStyles.map(function (s) {
      return s.open;
    }).join('; '));
    args.push(htmlStyles.map(function (s) {
      return s.close;
    }).join('; '));
    return `%c${string}%c`;
  };
};

/**
 * @param {Object} record
 * @returns {Array}
 */
export default function format(record) {
  const args = [];
  const string = formatRecordToString(record, style(args));
  return [string, ...args];
}
//# sourceMappingURL=index.js.map