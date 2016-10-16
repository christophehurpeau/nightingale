/* global test */

import { strictEqual } from 'assert';
import format, { style } from '../../';

test('blue bold color', () => {
  strictEqual(
        style(['blue', 'bold'], 'test'),
        '<span style="color: #4682B4; font-weight: bold">test</span>',
    );
});

test('format simple message', () => {
  strictEqual(format({ message: 'test' }), 'test');
});
