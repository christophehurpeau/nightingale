'use strict';

var _formatterJSON = require('../../../lib/formatters/formatterJSON');

var _proclaim = require('proclaim');

/* global test */

test('Formatter JSON format', () => {
    const record = {
        level: 'record.level',
        datetime: 'record.datetime',
        message: 'record.message',
        extra: 'record.extra',
        context: 'record.context'
    };

    (0, _proclaim.deepEqual)((0, _formatterJSON.format)(record), record);
});
//# sourceMappingURL=FormatterJSON.js.map