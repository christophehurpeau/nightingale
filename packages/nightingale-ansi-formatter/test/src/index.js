/* global test */
import { strictEqual } from 'assert';
import format, { style } from '../../';

test('style: blue bold color', () => {
    strictEqual(style(['blue', 'bold'], 'test'), '\x1b[1m\x1b[34mtest\x1b[39m\x1b[22m');
});


test('format simple message', () => {
    strictEqual(format({ message: 'test' }), 'test');
});
