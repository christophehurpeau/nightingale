/* global test */

import Logger from '../../lib/Logger';
import StringHandler from '../../lib/handlers/StringHandler';
import assert from 'proclaim';

test('Logger: log method', () => {
    let stringHandler = new StringHandler(0);
    let logger = new Logger([stringHandler]);
    logger.log('log()');
    assert.strictEqual(stringHandler.string.substr(9), '→ log()\n');
});

test('Logger: info method', () => {
    let stringHandler = new StringHandler(0);
    let logger = new Logger([stringHandler]);
    logger.info('info()');
    assert.strictEqual(stringHandler.string.substr(9), '→ info()\n');
});

test('Logger: warn method', () => {
    let stringHandler = new StringHandler(0);
    let logger = new Logger([stringHandler]);
    logger.warn('warn()');
    assert.strictEqual(stringHandler.string.substr(9), '⚠ warn()\n');
});

test('Logger: error method', () => {
    let stringHandler = new StringHandler(0);
    let logger = new Logger([stringHandler]);
    logger.error('error()');
    assert.strictEqual(stringHandler.string.substr(9), '✖ error()\n');
});

test('Logger: alert method', () => {
    let stringHandler = new StringHandler(0);
    let logger = new Logger([stringHandler]);
    logger.alert('alert()');
    assert.strictEqual(stringHandler.string.substr(9), '‼ alert()\n');
});

test('Logger: fatal method', () => {
    let stringHandler = new StringHandler(0);
    let logger = new Logger([stringHandler]);
    logger.fatal('fatal()');
    assert.strictEqual(stringHandler.string.substr(9), '‼ fatal()\n');
});

test('Logger: debug method', () => {
    let stringHandler = new StringHandler(0);
    let logger = new Logger([stringHandler]);
    logger.debug('debug()');
    assert.strictEqual(stringHandler.string.substr(9), '• debug()\n');
});

test('Logger: success method', () => {
    let stringHandler = new StringHandler(0);
    let logger = new Logger([stringHandler]);
    logger.success('success()');
    assert.strictEqual(stringHandler.string.substr(9), '✔ success()\n');
});
