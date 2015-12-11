/* global test */

import { format } from '../../../lib/formatters/formatterJSON';

import { deepEqual } from 'proclaim';

test('Formatter JSON format', () => {
    const record = {
        level: 'record.level',
        datetime: 'record.datetime',
        message: 'record.message',
        extra: 'record.extra',
        context: 'record.context',
    };

    deepEqual(format(record), record);
});

