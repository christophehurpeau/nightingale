'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleFormatter = require('nightingale-formatter');

function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  } // eslint-disable-next-line unicorn/no-array-reduce


  return styles.reduce((part, styleName) => {
    switch (styleName) {
      case 'bold':
        return `*${part}*`;

      case 'italic':
        return `_${part}_`;

      case 'strikethrough':
        return `~${part}~`;
    }

    return part;
  }, string);
}
function format(record) {
  return nightingaleFormatter.formatRecordToString(record, style);
}

exports["default"] = format;
exports.style = style;
//# sourceMappingURL=index-node14.cjs.js.map
