'use strict';

var _nightingale = require('nightingale');

var _nightingale2 = _interopRequireDefault(_nightingale);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _nightingale.configure)([{ handlers: [new _2.default(_nightingale.levels.INFO)] }]);

const nightingaleLogger = new _nightingale2.default('nightingale');

nightingaleLogger.setContext({ nightingale: true });
nightingaleLogger.info('test');

const logger = nightingaleLogger.child('console');
logger.setContext({ nightingaleConsole: true });

logger.info('test');
//# sourceMappingURL=children.js.map