import { formatRecordToString } from 'nightingale-formatter';

function style(styles, string) {
  return string;
}

/**
 * @param {Object} record
 * @returns {string}
 */
function format(record) {
  return formatRecordToString(record, style);
}

// export style function
format.style = style;

export default format;
export { style };
//# sourceMappingURL=index-browser-dev.es.js.map
