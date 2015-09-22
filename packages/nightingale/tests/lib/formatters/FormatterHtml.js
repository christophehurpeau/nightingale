/* global test */

'use strict';

var _libFormattersFormatterHtml = require('../../../lib/formatters/formatterHtml');

var _proclaim = require('proclaim');

test('Formatter HTML: blue bold color', function () {
    (0, _proclaim.strictEqual)((0, _libFormattersFormatterHtml.style)(['blue', 'bold'], 'test'), '<span style="color: #4682B4; font-weight: bold">test</span>');
});
//# sourceMappingURL=FormatterHtml.js.map