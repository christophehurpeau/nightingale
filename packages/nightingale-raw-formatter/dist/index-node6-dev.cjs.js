'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleFormatter = require('nightingale-formatter');

function style(styles, string) {
  return string;
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
//# sourceMappingURL=index-node6-dev.cjs.js.map
