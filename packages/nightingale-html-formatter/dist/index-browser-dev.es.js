import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';

function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  return `<span style="${styles.map(function (styleName) {
    return styleToHtmlStyle[styleName].open;
  }).join('; ')}">${string}</span>`;
}
/**
 * @param {Object} record
 * @returns {string}
 */

function format(record) {
  return formatRecordToString(record, style);
}

export { format as default, style };
//# sourceMappingURL=index-browser-dev.es.js.map
