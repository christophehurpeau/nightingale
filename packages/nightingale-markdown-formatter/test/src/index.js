/* global test */
import { strictEqual } from 'assert';
import format, { style } from '../../';

test('style: blue bold color', () => {
    strictEqual(style(['blue', 'bold'], 'test'), '*test*');
});


test('format simple message', () => {
    strictEqual(format({ message: 'test' }), 'test');
});
