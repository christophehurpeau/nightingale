"use strict";
var lib = '../../lib/';
var Logger = require(lib + 'console').LoggerConsole;
var assert = require('proclaim');
var expect = assert.strictEqual;
var logger = new Logger();
test('blue bold color', function() {
  expect(logger.blue.bold('test'), '\x1b[34m\x1b[1mtest\x1b[22m\x1b[39m');
});
