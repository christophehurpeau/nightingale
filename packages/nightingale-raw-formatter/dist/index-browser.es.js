import { formatRecordToString } from 'nightingale-formatter';

function style(styles, value) {
  return value;
}

/**
 * @param {Object} record
 * @returns {string}
 */
function format(record) {
  return formatRecordToString(record, style);
}

export { format as default, style };
//# sourceMappingURL=index-browser.es.js.map
