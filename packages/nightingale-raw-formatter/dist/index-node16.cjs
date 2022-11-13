'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleFormatter = require('nightingale-formatter');

function style(styles, value) {
  return value;
}

/**
 * @param {Object} record
 * @returns {string}
 */
function format(record) {
  return nightingaleFormatter.formatRecordToString(record, style);
}

exports["default"] = format;
exports.style = style;
//# sourceMappingURL=index-node16.cjs.map
