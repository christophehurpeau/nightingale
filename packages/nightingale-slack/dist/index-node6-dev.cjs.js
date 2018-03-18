'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var markdownFormatter = _interopDefault(require('nightingale-markdown-formatter'));
var rawFormatter = _interopDefault(require('nightingale-raw-formatter'));
var levels = _interopDefault(require('nightingale-levels'));
var request = require('request');
var t = _interopDefault(require('flow-runtime'));

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

const createHandler = slackConfig => record => {
  const body = createBody(record, slackConfig);

  request.post({ url: slackConfig.webhookUrl, body, json: true }).on('error', err2 => console.error(err2.stack));
};

const SlackConfigType = t.type('SlackConfigType', t.exactObject(t.property('webhookUrl', t.string()), t.property('channel', t.nullable(t.string()), true), t.property('username', t.nullable(t.string()), true), t.property('iconUrl', t.nullable(t.string()), true), t.property('iconEmoji', t.nullable(t.string()), true)));


function SlackHandler(slackConfig, minLevel) {
  let _minLevelType = t.number();

  t.param('slackConfig', SlackConfigType).assert(slackConfig);
  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}

module.exports = SlackHandler;
//# sourceMappingURL=index-node6-dev.cjs.js.map
