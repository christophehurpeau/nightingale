'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var browserConsoleFormatter = _interopDefault(require('nightingale-browser-console-formatter'));
var consoleOutput = _interopDefault(require('nightingale-console-output'));
var createFindDebugLevel = _interopDefault(require('nightingale-debug'));

function getDebugString() {
  var querystring = document.location.search;
  var debugFromLocalStorage = global.localStorage && localStorage.debug || '';

  if (!querystring) {
    return debugFromLocalStorage;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
  var debugFromQueryString = decodeURI(querystring.replace(new RegExp('^(?:.*[&\\?]DEBUG(?:\\=([^&]*))?)?.*$', 'i'), '$1'));

  return (debugFromLocalStorage ? debugFromLocalStorage + ',' : '') + debugFromQueryString;
}

// debug string can change any time (localStorage), so we need a new object each time.
var findDebugLevel = function findDebugLevel(minLevel, key) {
  return createFindDebugLevel(getDebugString())(minLevel, key);
};
var handle = function handle(record) {
  return consoleOutput(browserConsoleFormatter(record), record);
};

function BrowserConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
}

module.exports = BrowserConsoleHandler;
//# sourceMappingURL=index-browser.cjs.js.map
