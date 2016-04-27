import format, { style } from '../../';
import { strictEqual } from 'assert';

test('style: blue bold color', () => {
    strictEqual(style(['blue', 'bold'], 'test'), 'test');
});


test('format simple message', () => {
    strictEqual(format({ message: 'test' }), 'test');
});
