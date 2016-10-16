'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = style;
exports.default = format;

var _nightingaleFormatter = require('nightingale-formatter');

function style(styles, string) {
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
function format(record) {
  return (0, _nightingaleFormatter.formatRecordToString)(record, style);
}

// export style function
format.style = style;
//# sourceMappingURL=index.js.map