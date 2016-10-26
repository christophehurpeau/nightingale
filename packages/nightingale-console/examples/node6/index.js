'use strict';

var _nightingale = require('nightingale');

var _nightingale2 = _interopRequireDefault(_nightingale);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _nightingale.configure)([{ handlers: [new _2.default(_nightingale.levels.INFO)] }]);

const logger = new _nightingale2.default('nightingale:console');

logger.debug('test');
logger.info('test');
logger.warn('test');
//# sourceMappingURL=index.js.map