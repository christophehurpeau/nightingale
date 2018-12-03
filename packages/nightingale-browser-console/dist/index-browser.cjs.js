'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var browserConsoleFormatter = _interopDefault(require('nightingale-browser-console-formatter'));
var consoleOutput = _interopDefault(require('nightingale-console-output'));
var createFindDebugLevel = _interopDefault(require('nightingale-debug'));

function getDebugString() {
  var querystring = document.location && document.location.search;
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

exports.default = BrowserConsoleHandler;
//# sourceMappingURL=index-browser.cjs.js.map
