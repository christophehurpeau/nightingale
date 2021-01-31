import { formatRecordToString, styleToHtmlStyleThemeDark, styleToHtmlStyleThemeLight } from 'nightingale-formatter';

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
    }).join('; '));
    args.push(htmlStyles.map(function (s) {
      return s.close;
    }).join('; '));
    return `%c${string}%c`;
  };
};
function createBrowserConsoleFormatter(theme) {
  if (theme === void 0) {
    theme = 'light';
  }

  var styleToHtmlStyle = theme === 'dark' ? styleToHtmlStyleThemeDark : styleToHtmlStyleThemeLight;
  return function format(record) {
    var args = [];
    var string = formatRecordToString(record, style(styleToHtmlStyle, args));
    return [string].concat(args);
  };
}
/** @deprecated use createBrowserConsoleFormatter */

var index = createBrowserConsoleFormatter('light');

export default index;
export { createBrowserConsoleFormatter, style };
//# sourceMappingURL=index-browser-dev.es.js.map
