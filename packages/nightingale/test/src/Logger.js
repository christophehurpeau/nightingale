/* global test */

import Logger, { configure, levels } from '../../lib';
import StringHandler from 'nightingale-string';
import { strictEqual } from 'assert';

test('Logger: log method', () => {
    let stringHandler = new StringHandler(levels.ALL);
    configure([{ handlers: [stringHandler] }]);
    let logger = new Logger();
    logger.log('log()');
    strictEqual(stringHandler.string.substr(9), '→ log()\n');
});

test('Logger: info method', () => {
    let stringHandler = new StringHandler(levels.ALL);
    configure([{ handlers: [stringHandler] }]);
    let logger = new Logger();
    logger.info('info()');
    strictEqual(stringHandler.string.substr(9), '→ info()\n');
});

test('Logger: warn method', () => {
    let stringHandler = new StringHandler(levels.ALL);
    configure([{ handlers: [stringHandler] }]);
    let logger = new Logger();
    logger.warn('warn()');
    strictEqual(stringHandler.string.substr(9), '⚠ warn()\n');
});

test('Logger: error method', () => {
    let stringHandler = new StringHandler(levels.ALL);
    configure([{ handlers: [stringHandler] }]);
    let logger = new Logger();
    logger.error('error()');
    strictEqual(stringHandler.string.substr(9), '✖ error()\n');
});

test('Logger: alert method', () => {
    let stringHandler = new StringHandler(levels.ALL);
    configure([{ handlers: [stringHandler] }]);
    let logger = new Logger();
    logger.alert('alert()');
    strictEqual(stringHandler.string.substr(9), '‼ alert()\n');
});

test('Logger: fatal method', () => {
    let stringHandler = new StringHandler(levels.ALL);
    configure([{ handlers: [stringHandler] }]);
    let logger = new Logger();
    logger.fatal('fatal()');
    strictEqual(stringHandler.string.substr(9), '‼ fatal()\n');
});

test('Logger: debug method', () => {
    let stringHandler = new StringHandler(levels.ALL);
    configure([{ handlers: [stringHandler] }]);
    let logger = new Logger();
    logger.debug('debug()');
    strictEqual(stringHandler.string.substr(9), '• debug()\n');
});

test('Logger: success method', () => {
    let stringHandler = new StringHandler(levels.ALL);
    configure([{ handlers: [stringHandler] }]);
    let logger = new Logger();
    logger.success('success()');
    strictEqual(stringHandler.string.substr(9), '✔ success()\n');
});
