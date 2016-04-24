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

var _nightingaleRawFormatter = require('nightingale-raw-formatter');

var _nightingaleRawFormatter2 = _interopRequireDefault(_nightingaleRawFormatter);

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
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StringHandler = /**
                     * @function
                     * @param _AbstractHandler
                    */function (_AbstractHandler) {
    _inherits(StringHandler, _AbstractHandler);

    /**
     * @param {int} minLevel
    * @function
    */

    function StringHandler(minLevel) {
        _classCallCheck(this, StringHandler);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StringHandler).call(this, minLevel, _nightingaleRawFormatter2.default));

        _this._buffer = '';
        _this.write = function (string) {
            _this._buffer += string;
            _this._buffer += '\n';
        };
        return _this;
    }

    _createClass(StringHandler, [{
        key: 'string',
        get: /**
              * @function
             */function get() {
            return this._buffer;
        }
    }]);

    return StringHandler;
}(_nightingaleHandler2.default);

exports.default = StringHandler;
//# sourceMappingURL=index.js.map