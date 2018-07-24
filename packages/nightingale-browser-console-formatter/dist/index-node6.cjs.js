'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleFormatter = require('nightingale-formatter');

const style = args => (styles, string) => {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  const htmlStyles = styles.map(styleName => nightingaleFormatter.styleToHtmlStyle[styleName]);
  args.push(htmlStyles.map(s => s.open).join('; '));
  args.push(htmlStyles.map(s => s.close).join('; '));
  return `%c${string}%c`;
};
/**
 * @param {Object} record
 * @returns {Array}
 */

function format(record) {
  const args = [];
  const string = nightingaleFormatter.formatRecordToString(record, style(args));
  return [string, ...args];
}

exports.style = style;
exports.default = format;
//# sourceMappingURL=index-node6.cjs.js.map
