/* eslint camelcase: "off" */
import markdownFormatter from 'nightingale-markdown-formatter';
import rawFormatter from 'nightingale-raw-formatter';
import { post } from 'request';
import levels from 'nightingale-levels';

import t from 'flow-runtime';
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

const createHandler = slackConfig => record => {
  const markdown = markdownFormatter(record);
  const raw = rawFormatter(record);

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

  post({ url: slackConfig.webhookUrl, body, json: true }).on('error', err2 => console.error(err2.stack));
};

const SlackConfigType = t.type('SlackConfigType', t.object(t.property('webhookUrl', t.string()), t.property('channel', t.nullable(t.string())), t.property('username', t.nullable(t.string())), t.property('iconUrl', t.nullable(t.string())), t.property('iconEmoji', t.nullable(t.string()))));


export default function SlackHandler(slackConfig, minLevel) {
  let _minLevelType = t.number();

  t.param('slackConfig', SlackConfigType).assert(slackConfig);
  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}
//# sourceMappingURL=index.js.map