"use strict";
var lib = '../../lib/';
var Logger = require(lib + 'html');
var assert = require('proclaim');
var expect = assert.strictEqual;
var logger = new Logger();
test('blue blold color', function() {
  expect(logger.blue.bold('test'), '<span style="font-size: bold; color: #4682B4">test</span>');
});
