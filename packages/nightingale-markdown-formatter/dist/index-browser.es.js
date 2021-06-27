import { formatRecordToString } from 'nightingale-formatter';

function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  return styles.reduce(function (string, styleName) {
    switch (styleName) {
      case 'bold':
        return "*" + string + "*";

      case 'italic':
        return "_" + string + "_";

      case 'strikethrough':
        return "~" + string + "~";
    }

    return string;
  }, string);
}
function format(record) {
  return formatRecordToString(record, style);
}

export default format;
export { style };
//# sourceMappingURL=index-browser.es.js.map
