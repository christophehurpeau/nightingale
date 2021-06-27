import { formatRecordToString, styleToHtmlStyleThemeDark, styleToHtmlStyleThemeLight } from 'nightingale-formatter';

const style = (styleToHtmlStyle, args) => (styles, string) => {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  const htmlStyles = styles.map(styleName => styleToHtmlStyle[styleName]);
  args.push(htmlStyles.map(s => s.open).join('; '), htmlStyles.map(s => s.close).join('; '));
  return `%c${string}%c`;
};
function createBrowserConsoleFormatter(theme = 'light') {
  const styleToHtmlStyle = theme === 'dark' ? styleToHtmlStyleThemeDark : styleToHtmlStyleThemeLight;
  return function format(record) {
    const args = [];
    const string = formatRecordToString(record, style(styleToHtmlStyle, args));
    return [string, ...args];
  };
}
/** @deprecated use createBrowserConsoleFormatter */

const index = createBrowserConsoleFormatter('light');

export default index;
export { createBrowserConsoleFormatter, style };
//# sourceMappingURL=index-browsermodern.es.js.map
