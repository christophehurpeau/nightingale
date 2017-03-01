'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SlackHandler;

var _request = require('request');

var _createBody = require('./createBody');

var _createBody2 = _interopRequireDefault(_createBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createHandler = slackConfig => record => {
  const body = (0, _createBody2.default)(record, slackConfig);

  (0, _request.post)({ url: slackConfig.webhookUrl, body, json: true }).on('error', err2 => console.error(err2.stack));
};

function SlackHandler(slackConfig, minLevel) {
  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}
//# sourceMappingURL=index.js.map