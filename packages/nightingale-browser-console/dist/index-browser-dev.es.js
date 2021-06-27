import { createBrowserConsoleFormatter } from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';

function getDebugString() {
  var _document$location;

  var querystring = (_document$location = document.location) == null ? void 0 : _document$location.search;
  var debugFromLocalStorage = window.localStorage && localStorage.getItem('debug') || '';

  if (!querystring) {
    return debugFromLocalStorage;
  } // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param


  var debugFromQueryString = decodeURI(querystring.replace( // eslint-disable-next-line unicorn/no-unsafe-regex
  new RegExp('^(?:.*[&\\?]DEBUG(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
  return (debugFromLocalStorage ? debugFromLocalStorage + "," : '') + debugFromQueryString;
}

var findDebugLevel = function findDebugLevel(minLevel, key) {
  return createFindDebugLevel(getDebugString())(minLevel, key);
};

var getDefaultTheme = function getDefaultTheme() {
  try {
    var configInLocalStorage = localStorage.getItem('NIGHTINGALE_THEME');

    if (configInLocalStorage && configInLocalStorage === 'dark') {
      return configInLocalStorage;
    }
  } catch (_unused) {}

  return 'light';
};

var createHandler = function createHandler(theme) {
  if (theme === void 0) {
    theme = getDefaultTheme();
  }

  var browserConsoleFormatter = createBrowserConsoleFormatter(theme);
  return function (record) {
    consoleOutput(browserConsoleFormatter(record), record);
  };
};

var BrowserConsoleHandler = function BrowserConsoleHandler(minLevel, options) {
  if (options === void 0) {
    options = {};
  }

  this.minLevel = 0;

  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };

  this.handle = createHandler(options.theme);
};

export default BrowserConsoleHandler;
export { BrowserConsoleHandler };
//# sourceMappingURL=index-browser-dev.es.js.map
