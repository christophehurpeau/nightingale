'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var markdownFormatter = _interopDefault(require('nightingale-markdown-formatter'));
var rawFormatter = _interopDefault(require('nightingale-raw-formatter'));
var Level = _interopDefault(require('nightingale-levels'));

/* eslint-disable @typescript-eslint/camelcase */
const levelToSlackColor = {
  [Level.TRACE]: '#808080',
  [Level.DEBUG]: '#808080',
  [Level.INFO]: '#808080',
  [Level.WARN]: 'warning',
  [Level.ERROR]: 'danger',
  [Level.CRITICAL]: 'danger',
  [Level.FATAL]: 'danger',
  [Level.EMERGENCY]: 'danger'
};
var createBody = ((record, slackConfig) => {
  const markdown = markdownFormatter(record);
  const raw = rawFormatter(record);
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
});

exports.default = createBody;
//# sourceMappingURL=createBody-node10.cjs.js.map
