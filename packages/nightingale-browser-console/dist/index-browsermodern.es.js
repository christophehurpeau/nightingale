import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';

function getDebugString() {
  const querystring = document.location.search;
  const debugFromLocalStorage = window.localStorage && localStorage.debug || '';

  if (!querystring) {
    return debugFromLocalStorage;
  } // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param


  const debugFromQueryString = decodeURI(querystring.replace(new RegExp('^(?:.*[&\\?]DEBUG(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
  return (debugFromLocalStorage ? `${debugFromLocalStorage},` : '') + debugFromQueryString;
}

const findDebugLevel = function findDebugLevel(minLevel, key) {
  return createFindDebugLevel(getDebugString())(minLevel, key);
};

const handle = function handle(record) {
  consoleOutput(browserConsoleFormatter(record), record);
};

class BrowserConsoleHandler {
  constructor(minLevel) {
    this.minLevel = 0;
    this.handle = handle;
    this.isHandling = void 0;

    this.isHandling = function (level, key) {
      return level >= findDebugLevel(minLevel, key);
    };
  }

}

export default BrowserConsoleHandler;
//# sourceMappingURL=index-browsermodern.es.js.map
