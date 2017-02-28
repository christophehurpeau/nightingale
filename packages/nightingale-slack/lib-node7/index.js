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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint camelcase: "off" */
const levelToSlackColor = {
  [_nightingaleLevels2.default.TRACE]: '#808080',
  [_nightingaleLevels2.default.DEBUG]: '#808080',
  [_nightingaleLevels2.default.INFO]: '#808080',
  [_nightingaleLevels2.default.WARN]: 'warning',
  [_nightingaleLevels2.default.ERROR]: 'danger',
  [_nightingaleLevels2.default.CRITICAL]: 'danger',
  [_nightingaleLevels2.default.FATAL]: 'danger',
  [_nightingaleLevels2.default.EMERGENCY]: 'danger'
};

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

function SlackHandler(slackConfig, minLevel) {
  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}
//# sourceMappingURL=index.js.map