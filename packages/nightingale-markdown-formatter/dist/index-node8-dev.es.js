import { formatRecordToString } from 'nightingale-formatter';

function style(styles, string) {
  if (!styles || !styles.length || !string) {
    return string;
  }

  return styles.reduce((string, styleName) => {
    switch (styleName) {
      case 'bold':
        return `*${string}*`;
      case 'italic':
        return `_${string}_`;
      case 'strikethrough':
        return `~${string}~`;
    }

    return string;
  }, string);
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
//# sourceMappingURL=index-node8-dev.es.js.map
