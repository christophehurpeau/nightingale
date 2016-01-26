'use strict';

var _formatterHtml = require('../../../lib/formatters/formatterHtml');

var _proclaim = require('proclaim');

/* global test */

test('Formatter HTML: blue bold color', () => {
    (0, _proclaim.strictEqual)((0, _formatterHtml.style)(['blue', 'bold'], 'test'), '<span style="color: #4682B4; font-weight: bold">test</span>');
});
//# sourceMappingURL=formatterHtml.js.map