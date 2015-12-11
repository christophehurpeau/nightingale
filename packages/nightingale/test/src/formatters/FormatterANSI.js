/* global test */

import { style } from '../../../lib/formatters/formatterANSI';
import { strictEqual } from 'proclaim';

test('Formatter ANSI: blue bold color', () => {
    strictEqual(style(['blue', 'bold'], 'test'), '\x1b[1m\x1b[34mtest\x1b[39m\x1b[22m');
});

