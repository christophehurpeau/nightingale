import { Level } from 'nightingale-levels';
import format from '.';

test('format record', () => {
  const record = {
    key: 'record.key',
    level: Level.INFO,
    datetime: new Date(2000, 1, 1, 1, 0, 0),
    message: 'record.message',
    metadata: {},
    extra: {},
  };

  expect(format(record)).toBe(JSON.stringify(record));
});

test('format error', () => {
  const error = new Error('test message');
  const record = {
    key: 'record.key',
    level: Level.INFO,
    datetime: new Date(2000, 1, 1, 1, 0, 0),
    message: 'record.message',
    metadata: {
      error,
    },
    extra: {},
  };

  expect(format(record)).toBe(
    JSON.stringify({
      ...record,
      metadata: { error: { message: 'test message', stack: error.stack } },
    }),
  );
});

test('format map', () => {
  const map = new Map<unknown, unknown>([
    [1, 'value1'],
    ['2', 'value2'],
    ['3', 3],
    [{}, 'ignore value'],
  ]);
  const record = {
    key: 'record.key',
    level: Level.INFO,
    datetime: new Date(2000, 1, 1, 1, 0, 0),
    message: 'record.message',
    metadata: {
      map,
    },
    extra: {},
  };

  expect(format(record)).toBe(
    JSON.stringify({
      ...record,
      metadata: { map: { '1': 'value1', '2': 'value2', '3': 3 } },
    }),
  );
});
