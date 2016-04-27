'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _nightingaleHandler = require('nightingale-handler');

var _nightingaleHandler2 = _interopRequireDefault(_nightingaleHandler);

var _nightingaleMarkdownFormatter = require('nightingale-markdown-formatter');

var _nightingaleMarkdownFormatter2 = _interopRequireDefault(_nightingaleMarkdownFormatter);

var _nightingaleSlackOutput = require('nightingale-slack-output');

var _nightingaleSlackOutput2 = _interopRequireDefault(_nightingaleSlackOutput);

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

var SlackHandler = /**
                    * @function
                    * @param _AbstractHandler
                   */function (_AbstractHandler) {
    _inherits(SlackHandler, _AbstractHandler);

    /**
     * @function
     * @param {Object} slackConfig
     * @param minLevel
    */
    function SlackHandler(slackConfig, minLevel) {
        _classCallCheck(this, SlackHandler);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SlackHandler).call(this, minLevel, _nightingaleMarkdownFormatter2.default, (0, _nightingaleSlackOutput2.default)(slackConfig)));
    }

    return SlackHandler;
}(_nightingaleHandler2.default);

exports.default = SlackHandler;
//# sourceMappingURL=index.js.map