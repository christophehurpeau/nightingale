import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';

function getDebugString() {
  var _document$location;

  const querystring = (_document$location = document.location) === null || _document$location === void 0 ? void 0 : _document$location.search;
  const debugFromLocalStorage = window.localStorage && localStorage.getItem('debug') || '';

  if (!querystring) {
    return debugFromLocalStorage;
  } // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param


  const debugFromQueryString = decodeURI(querystring.replace( // eslint-disable-next-line unicorn/no-unsafe-regex
  new RegExp('^(?:.*[&\\?]DEBUG(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
  return (debugFromLocalStorage ? `${debugFromLocalStorage},` : '') + debugFromQueryString;
}

const findDebugLevel = (minLevel, key) => createFindDebugLevel(getDebugString())(minLevel, key);

const handle = record => {
  consoleOutput(browserConsoleFormatter(record), record);
};

class BrowserConsoleHandler {
  constructor(minLevel) {
    this.minLevel = 0;
    this.handle = handle;

    this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);
  }

}

export default BrowserConsoleHandler;
//# sourceMappingURL=index-browsermodern.es.js.map
