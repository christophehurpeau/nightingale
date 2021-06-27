'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleFormatter = require('nightingale-formatter');

var style = function style(styleToHtmlStyle, args) {
  return function (styles, string) {
    if (!styles || styles.length === 0 || !string) {
      return string;
    }

    var htmlStyles = styles.map(function (styleName) {
      return styleToHtmlStyle[styleName];
    });
    args.push(htmlStyles.map(function (s) {
      return s.open;
    }).join('; '), htmlStyles.map(function (s) {
      return s.close;
    }).join('; '));
    return "%c" + string + "%c";
  };
};
function createBrowserConsoleFormatter(theme) {
  if (theme === void 0) {
    theme = 'light';
  }

  var styleToHtmlStyle = theme === 'dark' ? nightingaleFormatter.styleToHtmlStyleThemeDark : nightingaleFormatter.styleToHtmlStyleThemeLight;
  return function format(record) {
    var args = [];
    var string = nightingaleFormatter.formatRecordToString(record, style(styleToHtmlStyle, args));
    return [string].concat(args);
  };
}
/** @deprecated use createBrowserConsoleFormatter */

var index = createBrowserConsoleFormatter('light');

exports.createBrowserConsoleFormatter = createBrowserConsoleFormatter;
exports.default = index;
exports.style = style;
//# sourceMappingURL=index-browser-dev.cjs.js.map
