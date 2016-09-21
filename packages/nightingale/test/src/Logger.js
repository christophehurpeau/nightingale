/* global test */
/* eslint import/no-extraneous-dependencies: "off" */
import { strictEqual } from 'assert';
import StringHandler from 'nightingale-string';
import Logger, { levels } from '../../';

class TestableStringLogger extends Logger {
  constructor() {
    super('');
    this.stringHandler = new StringHandler(levels.ALL);
  }

  getConfig() {
    return {
      handlers: [this.stringHandler],
      processors: [],
    };
  }

  get string() {
    return this.stringHandler.string;
  }
}

test('Logger: log method', () => {
  let logger = new TestableStringLogger();
  logger.log('log()');
  strictEqual(logger.string.substr(9), '→ log()\n');
});

test('Logger: info method', () => {
  let logger = new TestableStringLogger();
  logger.info('info()');
  strictEqual(logger.string.substr(9), '→ info()\n');
});

test('Logger: warn method', () => {
  let logger = new TestableStringLogger();
  logger.warn('warn()');
  strictEqual(logger.string.substr(9), '⚠ warn()\n');
});

test('Logger: error method', () => {
  let logger = new TestableStringLogger();
  logger.error('error()');
  strictEqual(logger.string.substr(9), '✖ error()\n');
});

test('Logger: alert method', () => {
  let logger = new TestableStringLogger();
  logger.alert('alert()');
  strictEqual(logger.string.substr(9), '‼ alert()\n');
});

test('Logger: fatal method', () => {
  let logger = new TestableStringLogger();
  logger.fatal('fatal()');
  strictEqual(logger.string.substr(9), '‼ fatal()\n');
});

test('Logger: debug method', () => {
  let logger = new TestableStringLogger();
  logger.debug('debug()');
  strictEqual(logger.string.substr(9), '• debug()\n');
});

test('Logger: success method', () => {
  let logger = new TestableStringLogger();
  logger.success('success()');
  strictEqual(logger.string.substr(9), '✔ success()\n');
});
