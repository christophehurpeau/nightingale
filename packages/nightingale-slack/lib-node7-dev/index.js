'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SlackHandler;

var _nightingaleMarkdownFormatter = require('nightingale-markdown-formatter');

var _nightingaleMarkdownFormatter2 = _interopRequireDefault(_nightingaleMarkdownFormatter);

var _nightingaleRawFormatter = require('nightingale-raw-formatter');

var _nightingaleRawFormatter2 = _interopRequireDefault(_nightingaleRawFormatter);

var _request = require('request');

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const levelToSlackColor = {
  [_nightingaleLevels2.default.TRACE]: '#808080',
  [_nightingaleLevels2.default.DEBUG]: '#808080',
  [_nightingaleLevels2.default.INFO]: '#808080',
  [_nightingaleLevels2.default.WARN]: 'warning',
  [_nightingaleLevels2.default.ERROR]: 'danger',
  [_nightingaleLevels2.default.CRITICAL]: 'danger',
  [_nightingaleLevels2.default.FATAL]: 'danger',
  [_nightingaleLevels2.default.EMERGENCY]: 'danger'
}; /* eslint camelcase: "off" */


const createHandler = slackConfig => record => {
  const markdown = (0, _nightingaleMarkdownFormatter2.default)(record);
  const raw = (0, _nightingaleRawFormatter2.default)(record);

  const body = {
    channel: slackConfig.channel,
    username: slackConfig.username,
    icon_url: slackConfig.iconUrl,
    icon_emoji: slackConfig.iconEmoji,
    attachments: [{
      fallback: raw,
      title: record.message,
      color: levelToSlackColor[record.level],
      text: markdown,
      mrkdwn_in: ['text']
    }]
  };

  (0, _request.post)({ url: slackConfig.webhookUrl, body, json: true }).on('error', err2 => console.error(err2.stack));
};

const SlackConfigType = _flowRuntime2.default.type('SlackConfigType', _flowRuntime2.default.object(_flowRuntime2.default.property('webhookUrl', _flowRuntime2.default.string()), _flowRuntime2.default.property('channel', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('username', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('iconUrl', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('iconEmoji', _flowRuntime2.default.nullable(_flowRuntime2.default.string()))));

function SlackHandler(slackConfig, minLevel) {
  let _minLevelType = _flowRuntime2.default.number();

  _flowRuntime2.default.param('slackConfig', SlackConfigType).assert(slackConfig);

  _flowRuntime2.default.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}
//# sourceMappingURL=index.js.map