import Level from 'nightingale-levels';
import format, { style } from '.';

test('style: blue bold color', () => {
  const args: Array<string> = [];
  expect(style(args)(['blue', 'bold'], 'test')).toBe('%ctest%c');
  expect(args).toEqual([
    'color: #00a0ff; font-weight: bold',
    'color: initial; font-weight: normal',
  ]);
});

test('format simple message', () => {
  const record = {
    key: 'record.key',
    level: Level.INFO,
    datetime: new Date(2000, 1, 1, 1, 0, 0),
    message: 'test',
    metadata: {},
    extra: {},
  };

  const [string, ...args] = format(record);
  expect(string).toBe('%crecord.key%c %c01:00:00%c → test');
  expect(args).toEqual([
    'color: #808080',
    'color: initial',
    'color: gray; font-weight: bold',
    'color: initial; font-weight: normal',
  ]);
});
