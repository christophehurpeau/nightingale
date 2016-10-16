'use strict';

var _assert = require('assert');

var _ = require('../../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test */
test('format record', () => {
  const record = {
    level: 'record.level',
    datetime: 'record.datetime',
    message: 'record.message',
    metadata: 'record.metadata',
    extra: 'record.extra'
  };

  (0, _assert.deepStrictEqual)((0, _2.default)(record), JSON.stringify(record));
});
//# sourceMappingURL=index.js.map