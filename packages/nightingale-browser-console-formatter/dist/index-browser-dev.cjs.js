'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleFormatter = require('nightingale-formatter');

var style = function style(args) {
  return function (styles, string) {
    if (!styles || !styles.length || !string) {
      return string;
    }

    var htmlStyles = styles.map(function (styleName) {
      return nightingaleFormatter.styleToHtmlStyle[styleName];
    });
    args.push(htmlStyles.map(function (s) {
      return s.open;
    }).join('; '));
    args.push(htmlStyles.map(function (s) {
      return s.close;
    }).join('; '));
    return '%c' + string + '%c';
  };
};

/**
 * @param {Object} record
 * @returns {Array}
 */
function format(record) {
  var args = [];
  var string = nightingaleFormatter.formatRecordToString(record, style(args));
  return [string].concat(args);
}

exports.style = style;
exports.default = format;
//# sourceMappingURL=index-browser-dev.cjs.js.map
