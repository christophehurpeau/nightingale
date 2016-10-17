'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _ = require('../..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global suite, test */
suite('test exports', () => {
  test('levelToStyles', () => (0, _assert2.default)(typeof _.levelToStyles === 'object'));
  test('levelToSymbol', () => (0, _assert2.default)(typeof _.levelToSymbol === 'object'));
  test('styleToHtmlStyle', () => (0, _assert2.default)(typeof _.styleToHtmlStyle === 'object'));
  test('styleToHexColor', () => (0, _assert2.default)(typeof _.styleToHexColor === 'object'));
  test('formatObject', () => (0, _assert2.default)(typeof _.formatObject === 'function'));
  test('formatRecordToString', () => (0, _assert2.default)(typeof _.formatRecordToString === 'function'));
});
//# sourceMappingURL=index.js.map