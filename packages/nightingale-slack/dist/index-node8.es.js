import markdownFormatter from 'nightingale-markdown-formatter';
import rawFormatter from 'nightingale-raw-formatter';
import levels from 'nightingale-levels';
import { post } from 'request';

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

  post({ url: slackConfig.webhookUrl, body, json: true }).on('error', err2 => console.error(err2.stack));
};

function SlackHandler(slackConfig, minLevel) {
  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}

export default SlackHandler;
//# sourceMappingURL=index-node8.es.js.map
