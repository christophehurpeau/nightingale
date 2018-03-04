import format from '../index';

test('format record', () => {
  const record = {
    level: 'record.level',
    datetime: 'record.datetime',
    message: 'record.message',
    metadata: 'record.metadata',
    extra: 'record.extra',
  };

  expect(format(record)).toBe(JSON.stringify(record));
});
