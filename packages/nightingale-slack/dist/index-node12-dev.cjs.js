'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const request = require('request');
const Level = require('nightingale-levels');
const markdownFormatter = require('nightingale-markdown-formatter');
const rawFormatter = require('nightingale-raw-formatter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);
const markdownFormatter__default = /*#__PURE__*/_interopDefaultLegacy(markdownFormatter);
const rawFormatter__default = /*#__PURE__*/_interopDefaultLegacy(rawFormatter);

/* eslint-disable camelcase */
const levelToSlackColor = {
  [Level__default.TRACE]: '#808080',
  [Level__default.DEBUG]: '#808080',
  [Level__default.INFO]: '#808080',
  [Level__default.WARN]: 'warning',
  [Level__default.ERROR]: 'danger',
  [Level__default.CRITICAL]: 'danger',
  [Level__default.FATAL]: 'danger',
  [Level__default.EMERGENCY]: 'danger'
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
  }).on('error', err2 => console.error(err2.stack));
};

class SlackHandler {
  constructor(slackConfig, minLevel) {
    this.minLevel = minLevel;
    this.handle = createHandler(slackConfig);
  }

}

exports.SlackHandler = SlackHandler;
exports.createBody = createBody;
exports.default = SlackHandler;
//# sourceMappingURL=index-node12-dev.cjs.js.map
