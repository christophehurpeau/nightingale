'use strict';

var _formatterANSI = require('../../../lib/formatters/formatterANSI');

var _proclaim = require('proclaim');

/* global test */

test('Formatter ANSI: blue bold color', () => {
    (0, _proclaim.strictEqual)((0, _formatterANSI.style)(['blue', 'bold'], 'test'), '\x1b[1m\x1b[34mtest\x1b[39m\x1b[22m');
});
//# sourceMappingURL=formatterANSI.js.map