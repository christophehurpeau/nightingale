import { Logger } from '.';

test('key argument', () => {
  const key = 'test';
  const logger = new Logger(key);
  expect(logger.key).toBe(key);
});

test('passing error', () => {
  const error = new Error('Test');
  const logger = new Logger('test');
  logger.addRecord = jest.fn();
  logger.log(error);
  expect(logger.addRecord).toHaveBeenNthCalledWith(1, {
    context: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    datetime: expect.any(Date),
    displayName: undefined,
    extra: {},
    key: 'test',
    level: 200,
    message: 'Error: Test',
    metadata: { error },
  });
});
