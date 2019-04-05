'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleFormatter = require('nightingale-formatter');

const style = args => (styles, string) => {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  const htmlStyles = styles.map(styleName => nightingaleFormatter.styleToHtmlStyle[styleName]);
  args.push(htmlStyles.map(s => s.open).join('; '));
  args.push(htmlStyles.map(s => s.close).join('; '));
  return `%c${string}%c`;
};
function format(record) {
  const args = [];
  const string = nightingaleFormatter.formatRecordToString(record, style(args));
  return [string, ...args];
}

exports.default = format;
exports.style = style;
//# sourceMappingURL=index-node10.cjs.js.map
