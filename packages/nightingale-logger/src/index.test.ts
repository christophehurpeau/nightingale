import Logger from './index';

test('key argument', () => {
  const key = 'test';
  const logger = new Logger(key);
  expect(logger.key).toBe(key);
});
