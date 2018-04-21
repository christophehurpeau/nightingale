import StringHandler from 'nightingale-string';
import Logger, { Level } from './';

class TestableStringLogger extends Logger {
  stringHandler: StringHandler;

  constructor() {
    super('');
    this.stringHandler = new StringHandler(Level.ALL);
  }

  getHandlersAndProcessors() {
    return {
      handlers: [this.stringHandler],
      processors: [],
    };
  }

  get string() {
    return this.stringHandler.string;
  }
}

test('log method', () => {
  const logger = new TestableStringLogger();
  logger.log('log()');
  expect(logger.string.substr(9)).toBe('→ log()\n');
});

test('info method', () => {
  const logger = new TestableStringLogger();
  logger.info('info()');
  expect(logger.string.substr(9)).toBe('→ info()\n');
});

test('warn method', () => {
  const logger = new TestableStringLogger();
  logger.warn('warn()');
  expect(logger.string.substr(9)).toBe('⚠ warn()\n');
});

test('error method', () => {
  const logger = new TestableStringLogger();
  logger.error('error()');
  expect(logger.string.substr(9)).toBe('✖ error()\n');
});

test('alert method', () => {
  const logger = new TestableStringLogger();
  logger.alert('alert()');
  expect(logger.string.substr(9)).toBe('‼ alert()\n');
});

test('fatal method', () => {
  const logger = new TestableStringLogger();
  logger.fatal('fatal()');
  expect(logger.string.substr(9)).toBe('‼ fatal()\n');
});

test('debug method', () => {
  const logger = new TestableStringLogger();
  logger.debug('debug()');
  expect(logger.string.substr(9)).toBe('• debug()\n');
});

test('success method', () => {
  const logger = new TestableStringLogger();
  logger.success('success()');
  expect(logger.string.substr(9)).toBe('✔ success()\n');
});
