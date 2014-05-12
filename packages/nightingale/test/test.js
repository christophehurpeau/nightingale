var LoggerConsole = require('../lib/console');
var LoggerHtml = require('../lib/html');

var assert = require('proclaim');
var expect = assert.strictEqual;

var consoleLogger = new LoggerConsole();
var htmlLogger = new LoggerHtml();

test('console', function() {
    expect(consoleLogger.blue.bold('test'), '\x1b[34m\x1b[1mtest\x1b[22m\x1b[39m');
});

test('html', function() {
    expect(htmlLogger.blue.bold('test'), '<span style="font-size: bold; color: #4682B4">test</span>');
});
