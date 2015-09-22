/* global test */

'use strict';

var _libFormattersFormatterJSON = require('../../../lib/formatters/formatterJSON');

var _proclaim = require('proclaim');

test('Formatter JSON format', function () {
    const record = {
        level: 'record.level',
        datetime: 'record.datetime',
        message: 'record.message',
        extra: 'record.extra',
        context: 'record.context'
    };

    (0, _proclaim.deepEqual)((0, _libFormattersFormatterJSON.format)(record), record);
});
//# sourceMappingURL=FormatterJSON.js.map