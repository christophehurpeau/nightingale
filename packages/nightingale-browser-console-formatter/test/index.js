import { strictEqual, deepStrictEqual } from 'assert';
import format, { style } from '../src/';

test('style: blue bold color', () => {
  const args = [];
  strictEqual(style(args)(['blue', 'bold'], 'test'), '%ctest%c');
  deepStrictEqual(args, [
    'color: #00a0ff; font-weight: bold',
    'color: initial; font-weight: normal',
  ]);
});


test('format simple message', () => {
  const [string, ...args] = format({ message: 'test' });
  strictEqual(string, 'test');
  deepStrictEqual(args, []);
});
