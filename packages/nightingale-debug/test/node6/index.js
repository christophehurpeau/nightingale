'use strict';

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

var _assert = require('assert');

var _ = require('../..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

suite('created with undefined', () => {
  const findDebugLevel = (0, _2.default)();
  test('should always return level passed', () => {
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.ALL, 'app'), _nightingaleLevels2.default.ALL);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.TRACE, 'app'), _nightingaleLevels2.default.TRACE);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.INFO, 'app'), _nightingaleLevels2.default.INFO);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.WARN, 'app'), _nightingaleLevels2.default.WARN);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.FATAL, 'app'), _nightingaleLevels2.default.FATAL);
  });
}); /* global suite, test */


suite('created with *', () => {
  const findDebugLevel = (0, _2.default)('*');
  test('should always return level ALL', () => {
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.ALL, 'app'), _nightingaleLevels2.default.ALL);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.TRACE, 'app'), _nightingaleLevels2.default.ALL);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.INFO, 'app'), _nightingaleLevels2.default.ALL);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.WARN, 'app'), _nightingaleLevels2.default.ALL);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.FATAL, 'app'), _nightingaleLevels2.default.ALL);
  });
});

suite('created with *,-app:*', () => {
  const findDebugLevel = (0, _2.default)('*,-app:*');
  test('app: should always return level passed', () => {
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.ALL, 'app'), _nightingaleLevels2.default.ALL);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.INFO, 'app'), _nightingaleLevels2.default.INFO);
  });

  test('not app: should always return level ALL', () => {
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.ALL, 'nightingale'), _nightingaleLevels2.default.ALL);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.INFO, 'nightingale'), _nightingaleLevels2.default.ALL);
  });
});

suite('created with nightingale,-nightingale:debug', () => {
  const findDebugLevel = (0, _2.default)('nightingale,-nightingale:debug');
  test('nightingale:debug: should always return level passed', () => {
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.ALL, 'nightingale:debug'), _nightingaleLevels2.default.ALL);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.INFO, 'nightingale:debug'), _nightingaleLevels2.default.INFO);
  });

  test('nightingale: should always return level ALL', () => {
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.ALL, 'nightingale'), _nightingaleLevels2.default.ALL);
    (0, _assert.strictEqual)(findDebugLevel(_nightingaleLevels2.default.INFO, 'nightingale'), _nightingaleLevels2.default.ALL);
  });
});
//# sourceMappingURL=index.js.map