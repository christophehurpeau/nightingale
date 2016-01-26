/* global test */

import { style } from '../../../lib/formatters/formatterHtml';

import { strictEqual } from 'proclaim';

test('Formatter HTML: blue bold color', () => {
    strictEqual(
        style(['blue', 'bold'], 'test'),
        '<span style="color: #4682B4; font-weight: bold">test</span>'
    );
});

