import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';

export var style = function style(args) {
  return function (styles, string) {
    if (!styles || !styles.length || !string) {
      return string;
    }

    var htmlStyles = styles.map(function (styleName) {
      return styleToHtmlStyle[styleName];
    });
    args.push(htmlStyles.map(function (s) {
      return s.open;
    }).join('; '));
    args.push(htmlStyles.map(function (s) {
      return s.close;
    }).join('; '));
    return '%c' + string + '%c';
  };
};

/**
 * @param {Object} record
 * @returns {Array}
 */
export default function format(record) {
  var args = [];
  var string = formatRecordToString(record, style(args));
  return [string].concat(args);
}
//# sourceMappingURL=index.js.map