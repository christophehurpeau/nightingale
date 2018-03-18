'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleFormatter = require('nightingale-formatter');

function style(styles, string) {
  if (!styles || !styles.length || !string) {
    return string;
  }

  return styles.reduce(function (string, styleName) {
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

/**
 * @param {Object} record
 * @returns {string}
 */
function format(record) {
  return nightingaleFormatter.formatRecordToString(record, style);
}

// export style function
format.style = style;

exports.style = style;
exports.default = format;
//# sourceMappingURL=index-node4-dev.cjs.js.map
