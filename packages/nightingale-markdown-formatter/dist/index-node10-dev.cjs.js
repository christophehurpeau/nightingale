'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleFormatter = require('nightingale-formatter');

function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

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

exports.style = style;
exports.default = format;
//# sourceMappingURL=index-node10-dev.cjs.js.map
