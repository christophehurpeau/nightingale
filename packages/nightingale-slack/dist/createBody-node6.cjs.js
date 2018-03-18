'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var markdownFormatter = _interopDefault(require('nightingale-markdown-formatter'));
var rawFormatter = _interopDefault(require('nightingale-raw-formatter'));
var levels = _interopDefault(require('nightingale-levels'));

/* eslint camelcase: "off" */

const levelToSlackColor = {
  [levels.TRACE]: '#808080',
  [levels.DEBUG]: '#808080',
  [levels.INFO]: '#808080',
  [levels.WARN]: 'warning',
  [levels.ERROR]: 'danger',
  [levels.CRITICAL]: 'danger',
  [levels.FATAL]: 'danger',
  [levels.EMERGENCY]: 'danger'
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

module.exports = createBody;
//# sourceMappingURL=createBody-node6.cjs.js.map
