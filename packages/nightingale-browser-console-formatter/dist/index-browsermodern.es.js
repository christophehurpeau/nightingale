import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';

const style = function style(args) {
  return function (styles, string) {
    if (!styles || styles.length === 0 || !string) {
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

function format(record) {
  const args = [];
  const string = formatRecordToString(record, style(args));
  return [string, ...args];
}

export default format;
export { style };
//# sourceMappingURL=index-browsermodern.es.js.map
