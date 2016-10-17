'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = undefined;
exports.default = format;

var _nightingaleFormatter = require('nightingale-formatter');

const style = exports.style = args => (styles, string) => {
  if (!styles || !styles.length || !string) {
    return string;
  }

  const htmlStyles = styles.map(styleName => _nightingaleFormatter.styleToHtmlStyle[styleName]);
  args.push(htmlStyles.map(s => s.open).join('; '));
  args.push(htmlStyles.map(s => s.close).join('; '));
  return `%c${ string }%c`;
};

/**
 * @param {Object} record
 * @returns {Array}
 */
function format(record) {
  const args = [];
  const string = (0, _nightingaleFormatter.formatRecordToString)(record, style(args));
  return [string, ...args];
}
//# sourceMappingURL=index.js.map