import { formatRecordToString } from 'nightingale-formatter';

export function style(styles, string) {
  return string;
}

/**
 * @param {Object} record
 * @returns {string}
 */
export default function format(record) {
  return formatRecordToString(record, style);
}

// export style function
format.style = style;
//# sourceMappingURL=index.js.map