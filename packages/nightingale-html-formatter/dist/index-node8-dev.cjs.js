'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleFormatter = require('nightingale-formatter');

function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  return `<span style="${styles.map(styleName => nightingaleFormatter.styleToHtmlStyle[styleName].open).join('; ')}">${string}</span>`;
}
/**
 * @param {Object} record
 * @returns {string}
 */

function format(record) {
  return nightingaleFormatter.formatRecordToString(record, style);
}

exports.default = format;
exports.style = style;
//# sourceMappingURL=index-node8-dev.cjs.js.map
