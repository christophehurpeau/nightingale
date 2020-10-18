'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var browserConsoleFormatter = require('nightingale-browser-console-formatter');
var consoleOutput = require('nightingale-console-output');
var createFindDebugLevel = require('nightingale-debug');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var browserConsoleFormatter__default = /*#__PURE__*/_interopDefaultLegacy(browserConsoleFormatter);
var consoleOutput__default = /*#__PURE__*/_interopDefaultLegacy(consoleOutput);
var createFindDebugLevel__default = /*#__PURE__*/_interopDefaultLegacy(createFindDebugLevel);

function getDebugString() {
  var _document$location;

  var querystring = (_document$location = document.location) == null ? void 0 : _document$location.search;
  var debugFromLocalStorage = window.localStorage && localStorage.getItem('debug') || '';

  if (!querystring) {
    return debugFromLocalStorage;
  } // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param


  var debugFromQueryString = decodeURI(querystring.replace( // eslint-disable-next-line unicorn/no-unsafe-regex
  new RegExp('^(?:.*[&\\?]DEBUG(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
  return (debugFromLocalStorage ? `${debugFromLocalStorage},` : '') + debugFromQueryString;
}

var findDebugLevel = function findDebugLevel(minLevel, key) {
  return createFindDebugLevel__default(getDebugString())(minLevel, key);
};

var handle = function handle(record) {
  consoleOutput__default(browserConsoleFormatter__default(record), record);
};

var BrowserConsoleHandler = function BrowserConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.handle = handle;

  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
};

exports.default = BrowserConsoleHandler;
//# sourceMappingURL=index-browser.cjs.js.map
