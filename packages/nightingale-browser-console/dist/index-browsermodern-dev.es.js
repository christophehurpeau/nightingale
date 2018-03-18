import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';
import t from 'flow-runtime';

function getDebugString() {
  const querystring = document.location.search;
  const debugFromLocalStorage = global.localStorage && localStorage.debug || '';

  if (!querystring) {
    return debugFromLocalStorage;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
  const debugFromQueryString = decodeURI(querystring.replace(new RegExp('^(?:.*[&\\?]DEBUG(?:\\=([^&]*))?)?.*$', 'i'), '$1'));

  return (debugFromLocalStorage ? `${debugFromLocalStorage},` : '') + debugFromQueryString;
}

const findDebugLevel = function findDebugLevel(minLevel, key) {
  return createFindDebugLevel(getDebugString())(minLevel, key);
};
const handle = function handle(record) {
  let _recordType = t.object();

  t.param('record', _recordType).assert(record);
  return consoleOutput(browserConsoleFormatter(record), record);
};

function BrowserConsoleHandler(minLevel) {
  let _minLevelType = t.number();

  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
}

export default BrowserConsoleHandler;
//# sourceMappingURL=index-browsermodern-dev.es.js.map
