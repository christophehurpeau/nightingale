/* global test */
import Logger from '../../';
import { strictEqual } from 'assert';

test('key argument', () => {
    const key = 'test';
    let logger = new Logger(key);
    strictEqual(logger.key, key);
});
