/* eslint-disable no-control-regex */
import format, { style } from '.';

test('style: blue bold color', () => {
  expect(style(['blue', 'bold'], 'test').replace(/[\u001b]/g, 'ESC')).toBe(
    'ESC[1mESC[34mtestESC[39mESC[22m',
  );
});

test('style: ansi256 color', () => {
  expect(style(['orange'], 'test').replace(/[\u001b]/g, 'ESC')).toBe(
    'ESC[38;5;208mtestESC[39m',
  );
});

test('format simple message', () => {
  expect(
    format({
      key: 'test',
      level: 100,
      message: 'test',
      datetime: new Date(2000, 1, 1, 1, 1, 1),
    }).replace(/[\u001b]/g, 'ESC'),
  ).toBe(
    'ESC[38;5;244mtestESC[39m ESC[1mESC[90m01:01:01ESC[39mESC[22m ESC[90m• testESC[39m',
  );
});
