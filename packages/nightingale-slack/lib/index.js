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

let SlackHandler = class SlackHandler extends _nightingaleHandler2.default {
    /**
     * @param {Object} slackConfig
     * @param minLevel
    */
    constructor(slackConfig, minLevel) {
        super(minLevel, _nightingaleMarkdownFormatter2.default, (0, _nightingaleSlackOutput2.default)(slackConfig));
    }
};
exports.default = SlackHandler;
//# sourceMappingURL=index.js.map