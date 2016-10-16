import { formatRecordToString } from 'nightingale-formatter';

export function style(styles, string) {
  if (!styles || !styles.length || !string) {
    return string;
  }

  return styles.reduce((string, styleName) => {
    switch (styleName) {
      case 'bold':
        return `*${ string }*`;
      case 'italic':
        return `_${ string }_`;
      case 'strikethrough':
        return `~${ string }~`;
    }

    return string;
  }, string);
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