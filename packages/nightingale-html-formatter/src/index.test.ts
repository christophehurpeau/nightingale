import Level from 'nightingale-levels';
import format, { style } from '.';

test('blue bold color', () => {
  expect(style(['blue', 'bold'], 'test')).toBe(
    '<span style="color: #00a0ff; font-weight: bold">test</span>',
  );
});

test('format simple message', () => {
  const record = {
    key: 'record.key',
    level: Level.INFO,
    datetime: new Date(2000, 1, 1, 1, 0, 0),
    message: 'record.message',
    metadata: {},
    extra: {},
  };

  expect(format(record)).toBe(
    '<span style="color: #808080">record.key</span> <span style="color: gray; font-weight: bold">01:00:00</span> → record.message',
  );
});
