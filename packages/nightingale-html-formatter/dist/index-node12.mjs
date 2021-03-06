import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';

function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
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
//# sourceMappingURL=index-node12.mjs.map
