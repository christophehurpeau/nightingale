import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';

function style(styles, string) {
  if (!styles || !styles.length || !string) {
    return string;
  }

  return `<span style="${styles.map(styleName => styleToHtmlStyle[styleName].open).join('; ')}">${string}</span>`;
}

/**
 * @param {Object} record
 * @returns {string}
 */
function format(record) {
  return formatRecordToString(record, style);
}

export default format;
export { style };
//# sourceMappingURL=index-node8-dev.es.js.map
