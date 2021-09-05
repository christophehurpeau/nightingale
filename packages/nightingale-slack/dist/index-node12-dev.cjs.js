'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const request = require('request');
const nightingaleLevels = require('nightingale-levels');
const markdownFormatter = require('nightingale-markdown-formatter');
const rawFormatter = require('nightingale-raw-formatter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const markdownFormatter__default = /*#__PURE__*/_interopDefaultLegacy(markdownFormatter);
const rawFormatter__default = /*#__PURE__*/_interopDefaultLegacy(rawFormatter);

/* eslint-disable camelcase */
const levelToSlackColor = {
  [nightingaleLevels.Level.TRACE]: '#808080',
  [nightingaleLevels.Level.DEBUG]: '#808080',
  [nightingaleLevels.Level.INFO]: '#808080',
  [nightingaleLevels.Level.WARN]: 'warning',
  [nightingaleLevels.Level.ERROR]: 'danger',
  [nightingaleLevels.Level.CRITICAL]: 'danger',
  [nightingaleLevels.Level.FATAL]: 'danger',
  [nightingaleLevels.Level.EMERGENCY]: 'danger'
};
function createBody(record, slackConfig) {
  const markdown = markdownFormatter__default(record);
  const raw = rawFormatter__default(record);
  return {
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
}

const createHandler = slackConfig => record => {
  const body = createBody(record, slackConfig);
  request.post({
    url: slackConfig.webhookUrl,
    body,
    json: true
  }).on('error', err2 => {
    console.error(err2.stack);
  });
};

class SlackHandler {
  constructor(slackConfig, minLevel) {
    this.minLevel = minLevel;
    this.handle = createHandler(slackConfig);
  }

}

exports.SlackHandler = SlackHandler;
exports.createBody = createBody;
exports['default'] = SlackHandler;
//# sourceMappingURL=index-node12-dev.cjs.js.map
