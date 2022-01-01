import { formatRecordToString } from 'nightingale-formatter';

function style(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  } // eslint-disable-next-line unicorn/no-array-reduce


  return styles.reduce(function (part, styleName) {
    switch (styleName) {
      case 'bold':
        return "*" + part + "*";

      case 'italic':
        return "_" + part + "_";

      case 'strikethrough':
        return "~" + part + "~";
    }

    return part;
  }, string);
}
function format(record) {
  return formatRecordToString(record, style);
}

export { format as default, style };
//# sourceMappingURL=index-browser.es.js.map
