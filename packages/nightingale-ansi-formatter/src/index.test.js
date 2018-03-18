/* eslint-disable no-control-regex */
import format, { style } from './index';

test('style: blue bold color', () => {
  expect(style(['blue', 'bold'], 'test').replace(/[\x1b]/g, 'ESC')).toBe(
    'ESC[1mESC[34mtestESC[39mESC[22m',
  );
});

test('style: ansi256 color', () => {
  expect(style(['orange'], 'test').replace(/[\x1b]/g, 'ESC')).toBe('ESC[38;5;208mtestESC[39m');
});

test('format simple message', () => {
  expect(format({ message: 'test' })).toBe('test');
});
