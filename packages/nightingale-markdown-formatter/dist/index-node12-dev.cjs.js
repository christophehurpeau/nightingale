'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleFormatter = require('nightingale-formatter');

function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  } // eslint-disable-next-line unicorn/no-array-reduce


  return styles.reduce((string, styleName) => {
    switch (styleName) {
      case 'bold':
        return `*${string}*`;

      case 'italic':
        return `_${string}_`;

      case 'strikethrough':
        return `~${string}~`;
    }

    return string;
  }, string);
}
function format(record) {
  return nightingaleFormatter.formatRecordToString(record, style);
}

exports["default"] = format;
exports.style = style;
//# sourceMappingURL=index-node12-dev.cjs.js.map
