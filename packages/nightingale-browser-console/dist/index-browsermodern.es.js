import { createBrowserConsoleFormatter } from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import { createFindDebugLevel } from 'nightingale-debug';

function getDebugString() {
  var _document$location;
  const querystring = (_document$location = document.location) === null || _document$location === void 0 ? void 0 : _document$location.search;
  const debugFromLocalStorage = window.localStorage && localStorage.getItem('debug') || '';
  if (!querystring) {
    return debugFromLocalStorage;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
  const debugFromQueryString = decodeURI(querystring.replace(
  // eslint-disable-next-line unicorn/no-unsafe-regex, prefer-regex-literals
  new RegExp('^(?:.*[&\\?]DEBUG(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
  return (debugFromLocalStorage ? `${debugFromLocalStorage},` : '') + debugFromQueryString;
}

// debug string can change any time (localStorage), so we need a new object each time.
const findDebugLevel = (minLevel, key) => createFindDebugLevel(getDebugString())(minLevel, key);
const getDefaultTheme = () => {
  try {
    const configInLocalStorage = localStorage.getItem('NIGHTINGALE_THEME');
    if (configInLocalStorage && configInLocalStorage === 'dark') {
      return configInLocalStorage;
    }
  } catch {}
  return 'light';
};
const createHandler = (theme = getDefaultTheme()) => {
  const browserConsoleFormatter = createBrowserConsoleFormatter(theme);
  return record => {
    consoleOutput(browserConsoleFormatter(record), record);
  };
};
class BrowserConsoleHandler {
  minLevel = 0;
  constructor(minLevel, options = {}) {
    this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);
    this.handle = createHandler(options.theme);
  }
}

export { BrowserConsoleHandler };
//# sourceMappingURL=index-browsermodern.es.js.map
