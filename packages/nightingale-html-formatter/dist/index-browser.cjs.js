'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleFormatter = require('nightingale-formatter');

function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  return "<span style=\"" + styles.map(function (styleName) {
    return nightingaleFormatter.styleToHtmlStyle[styleName].open;
  }).join('; ') + "\">" + string + "</span>";
}
/**
 * @param {Object} record
 * @returns {string}
 */

function format(record) {
  return nightingaleFormatter.formatRecordToString(record, style);
}

exports.style = style;
exports.default = format;
//# sourceMappingURL=index-browser.cjs.js.map
