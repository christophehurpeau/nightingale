"use strict";
var lib = '../../lib/';
var Logger = require(lib + 'html').LoggerHtml;
var assert = require('proclaim');
var expect = assert.strictEqual;
var logger = new Logger();
test('blue blold color', function() {
  expect(logger.blue.bold('test'), '<span style="color: #4682B4; font-size: bold">test</span>');
});

//# sourceMappingURL=test_html.js.map