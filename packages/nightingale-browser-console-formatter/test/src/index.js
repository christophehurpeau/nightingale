/* global test */
import { strictEqual, deepStrictEqual } from 'assert';
import format, { style } from '../../';

test('style: blue bold color', () => {
  const args = [];
  strictEqual(style(args)(['blue', 'bold'], 'test'), '%ctest%c');
  deepStrictEqual(args, [
    'color: #4682B4; font-weight: bold',
    'color: initial; font-weight: normal',
  ]);
});


test('format simple message', () => {
  const [string, args] = format({ message: 'test' });
  strictEqual(string, 'test');
  deepStrictEqual(args, []);
});
