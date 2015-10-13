'use strict';

var _get = require('babel-runtime/helpers/get').default;

var _inherits = require('babel-runtime/helpers/inherits').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Logger2 = require('./Logger');

var _Logger3 = _interopRequireDefault(_Logger2);

var _handlersConsoleHandler = require('./handlers/ConsoleHandler');

var _handlersConsoleHandler2 = _interopRequireDefault(_handlersConsoleHandler);

/**
 * A simplified way of creating a {@link Logger} with a {@link ConsoleHandler}
 */
/** @class ConsoleLogger 
* @param name 
* @param minLevel */
let ConsoleLogger = (function (_Logger) {
    _inherits(ConsoleLogger, _Logger);

    /**
     * Creates a new ConsoleLogger with a prefix.
     *
     * If no min level is specified, the min level is ALL if name is in `process.env.DEBUG`, else WARN
     *
     * @param {string} name
     * @param {int} [minLevel]
     */

    function ConsoleLogger(name, minLevel) {
        _classCallCheck(this, ConsoleLogger);

        _get(Object.getPrototypeOf(ConsoleLogger.prototype), 'constructor', this).call(this, [new _handlersConsoleHandler2.default(minLevel != null ? minLevel : name)]);

        this.setPrefix('[' + name + ']');
    }

    return ConsoleLogger;
})(_Logger3.default);

exports.default = ConsoleLogger;
module.exports = exports.default;
//# sourceMappingURL=ConsoleLogger.js.map