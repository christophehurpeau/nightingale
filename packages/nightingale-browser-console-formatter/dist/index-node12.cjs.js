'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleFormatter = require('nightingale-formatter');

const style = (styleToHtmlStyle, args) => (styles, string) => {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  const htmlStyles = styles.map(styleName => styleToHtmlStyle[styleName]);
  args.push(htmlStyles.map(s => s.open).join('; '));
  args.push(htmlStyles.map(s => s.close).join('; '));
  return `%c${string}%c`;
};
function createBrowserConsoleFormatter(theme = 'light') {
  const styleToHtmlStyle = theme === 'dark' ? nightingaleFormatter.styleToHtmlStyleThemeDark : nightingaleFormatter.styleToHtmlStyleThemeLight;
  return function format(record) {
    const args = [];
    const string = nightingaleFormatter.formatRecordToString(record, style(styleToHtmlStyle, args));
    return [string, ...args];
  };
}
/** @deprecated use createBrowserConsoleFormatter */

const index = createBrowserConsoleFormatter('light');

exports.createBrowserConsoleFormatter = createBrowserConsoleFormatter;
exports.default = index;
exports.style = style;
//# sourceMappingURL=index-node12.cjs.js.map
