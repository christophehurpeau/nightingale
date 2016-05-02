'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _nightingaleHandler = require('nightingale-handler');

var _nightingaleHandler2 = _interopRequireDefault(_nightingaleHandler);

var _nightingaleLevelNames = require('nightingale-level-names');

var _nightingaleLevelNames2 = _interopRequireDefault(_nightingaleLevelNames);

/**
 * @function
 * @param obj
*/
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
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint camelcase:"off" */


/**
 * @param {int} minLevel
 */

var WinstonAdapterHandler = /**
                             * @function
                             * @param _AbstractHandler
                            */function (_AbstractHandler) {
    _inherits(WinstonAdapterHandler, _AbstractHandler);

    /**
     * @function
     * @param winstonTransport
     * @param minLevel
    */
    function WinstonAdapterHandler(winstonTransport, minLevel) {
        _classCallCheck(this, WinstonAdapterHandler);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WinstonAdapterHandler).call(this, minLevel));

        _this.winstonTransport = winstonTransport;
        return _this;
    }

    _createClass(WinstonAdapterHandler, [{
        key: 'handle',
        value: /**
                * @function
                * @param record
               */function handle(record) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.winstonTransport.log(record.level, record.message, {
                    level_name: _nightingaleLevelNames2.default.get(record.level),
                    key: record.key,
                    metadata: record.metadata,
                    extra: record.extra
                }, function (err) {
                    if (err) {
                        return reject(err);
                    }

                    resolve();
                });
            });
        }
    }]);

    return WinstonAdapterHandler;
}(_nightingaleHandler2.default);

exports.default = WinstonAdapterHandler;
//# sourceMappingURL=index.js.map