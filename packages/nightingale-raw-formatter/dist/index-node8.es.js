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

export default format;
export { style };
//# sourceMappingURL=index-node8.es.js.map
