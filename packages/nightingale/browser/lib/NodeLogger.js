'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? /**
                                                                                     * @function
                                                                                     * @param obj
                                                                                    */ function (obj) { return typeof obj; } : /**
                                                                                                                                * @function
                                                                                                                                * @param obj
                                                                                                                               */ function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = /**
                    * @function
                   */ function () { /**
                                     * @function
                                     * @param target
                                     * @param props
                                    */ function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return (/**
                                                                                                                                                                                                                                                                                                                                                                            * @function
                                                                                                                                                                                                                                                                                                                                                                            * @param Constructor
                                                                                                                                                                                                                                                                                                                                                                            * @param protoProps
                                                                                                                                                                                                                                                                                                                                                                            * @param staticProps
                                                                                                                                                                                                                                                                                                                                                                           */ function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; } ); }();

var _get = /**
            * @function
            * @param object
            * @param property
            * @param receiver
           */ function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Logger2 = require('./Logger');

var _Logger3 = _interopRequireDefault(_Logger2);

var _alouette = require('alouette');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @function
 * @param self
 * @param call
*/
function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

/**
 * @function
 * @param subClass
 * @param superClass
*/
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeLogger = /**
                  * @function
                  * @param _Logger
                 */function (_Logger) {
    _inherits(NodeLogger, _Logger);

    /**
     * @function
    */
    function NodeLogger() {
        _classCallCheck(this, NodeLogger);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NodeLogger).apply(this, arguments));
    }

    _createClass(NodeLogger, [{
        key: 'error',

        /**
         * Log an error message
         *
         * @param {string|Error} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */
        value: /**
                * @function
                * @param message
                * @param context
                * @param contextStyles
               */function error(message, context, contextStyles) {
            if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) !== 'object') {
                message = message.message || message;
            } else {
                var parsedError = (0, _alouette.parse)(message);
                message = parsedError.toString();
            }
            return _get(Object.getPrototypeOf(NodeLogger.prototype), 'error', this).call(this, message, context, contextStyles);
        }
    }]);

    return NodeLogger;
}(_Logger3.default);

exports.default = NodeLogger;
//# sourceMappingURL=NodeLogger.js.map