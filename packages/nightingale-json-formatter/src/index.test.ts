import Level from 'nightingale-levels';
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
