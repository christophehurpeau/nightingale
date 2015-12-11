'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Handler2 = require('../Handler');

var _Handler3 = _interopRequireDefault(_Handler2);

var _LayoutDefault = require('../layouts/LayoutDefault');

var _LayoutDefault2 = _interopRequireDefault(_LayoutDefault);

var _formatterRaw = require('../formatters/formatterRaw');

var formatterRaw = _interopRequireWildcard(_formatterRaw);

var _OutputString = require('../outputs/OutputString');

var _OutputString2 = _interopRequireDefault(_OutputString);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StringHandler = (function (_Handler) {
    _inherits(StringHandler, _Handler);

    /**
     * @param {int} minLevel
     */

    function StringHandler(minLevel) {
        _classCallCheck(this, StringHandler);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(StringHandler).call(this, minLevel, new _LayoutDefault2.default(formatterRaw), new _OutputString2.default()));
    }

    _createClass(StringHandler, [{
        key: 'string',
        get: function get() {
            return this.output.string;
        }
    }]);

    return StringHandler;
})(_Handler3.default);

exports.default = StringHandler;
//# sourceMappingURL=StringHandler.js.map