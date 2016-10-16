/* global test */
import { deepStrictEqual } from 'assert';
import format from '../../';

test('format record', () => {
  const record = {
    level: 'record.level',
    datetime: 'record.datetime',
    message: 'record.message',
    metadata: 'record.metadata',
    extra: 'record.extra',
  };

  deepStrictEqual(format(record), JSON.stringify(record));
});
