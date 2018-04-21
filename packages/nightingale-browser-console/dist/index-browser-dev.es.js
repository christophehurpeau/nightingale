import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';

function getDebugString() {
  var querystring = document.location.search;
  var debugFromLocalStorage = window.localStorage && localStorage.debug || '';

  if (!querystring) {
    return debugFromLocalStorage;
  } // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param


  var debugFromQueryString = decodeURI(querystring.replace(new RegExp('^(?:.*[&\\?]DEBUG(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
  return (debugFromLocalStorage ? debugFromLocalStorage + "," : '') + debugFromQueryString;
}

var findDebugLevel = function findDebugLevel(minLevel, key) {
  return createFindDebugLevel(getDebugString())(minLevel, key);
};

var handle = function handle(record) {
  consoleOutput(browserConsoleFormatter(record), record);
};

var BrowserConsoleHandler = function BrowserConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = void 0;

  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
};

export default BrowserConsoleHandler;
//# sourceMappingURL=index-browser-dev.es.js.map
