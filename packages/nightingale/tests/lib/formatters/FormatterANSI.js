/* global test */

'use strict';

var _libFormattersFormatterANSI = require('../../../lib/formatters/formatterANSI');

var _proclaim = require('proclaim');

test('Formatter ANSI: blue bold color', function () {
    (0, _proclaim.strictEqual)((0, _libFormattersFormatterANSI.style)(['blue', 'bold'], 'test'), '\x1b[1m\x1b[34mtest\x1b[39m\x1b[22m');
});
//# sourceMappingURL=FormatterANSI.js.map