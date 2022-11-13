'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleFormatter = require('nightingale-formatter');

const style = (styleToHtmlStyle, args) => (styles, string) => {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }
  const htmlStyles = styles.map(styleName => styleToHtmlStyle[styleName]);
  args.push(htmlStyles.map(s => s.open).join('; '), htmlStyles.map(s => s.close).join('; '));
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

exports.createBrowserConsoleFormatter = createBrowserConsoleFormatter;
exports.style = style;
//# sourceMappingURL=index-node16.cjs.map
