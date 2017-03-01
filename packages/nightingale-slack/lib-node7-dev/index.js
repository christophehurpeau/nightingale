'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SlackHandler;

var _request = require('request');

var _createBody = require('./createBody');

var _createBody2 = _interopRequireDefault(_createBody);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createHandler = slackConfig => record => {
  const body = (0, _createBody2.default)(record, slackConfig);

  (0, _request.post)({ url: slackConfig.webhookUrl, body, json: true }).on('error', err2 => console.error(err2.stack));
};

const SlackConfigType = _flowRuntime2.default.type('SlackConfigType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('webhookUrl', _flowRuntime2.default.string()), _flowRuntime2.default.property('channel', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('username', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('iconUrl', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('iconEmoji', _flowRuntime2.default.nullable(_flowRuntime2.default.string()))));

function SlackHandler(slackConfig, minLevel) {
  let _minLevelType = _flowRuntime2.default.number();

  _flowRuntime2.default.param('slackConfig', SlackConfigType).assert(slackConfig);

  _flowRuntime2.default.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}
//# sourceMappingURL=index.js.map