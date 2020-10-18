'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.default = createBody;
//# sourceMappingURL=createBody-node10-dev.cjs.js.map
