import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';

export var style = args => (styles, string) => {
  if (!styles || !styles.length || !string) {
    return string;
  }

  var htmlStyles = styles.map(styleName => styleToHtmlStyle[styleName]);
  args.push(htmlStyles.map(s => s.open).join('; '));
  args.push(htmlStyles.map(s => s.close).join('; '));
  return `%c${ string }%c`;
};

/**
 * @param {Object} record
 * @returns {Array}
 */
export default function format(record) {
  var args = [];
  var string = formatRecordToString(record, style(args));
  return [string, args];
}
//# sourceMappingURL=index.js.map