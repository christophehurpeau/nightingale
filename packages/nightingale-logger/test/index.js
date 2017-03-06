/* global test */
import { strictEqual } from 'assert';
import Logger from '../';

test('key argument', () => {
  const key = 'test';
  let logger = new Logger(key);
  strictEqual(logger.key, key);
});
