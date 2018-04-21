import markdownFormatter from 'nightingale-markdown-formatter';
import rawFormatter from 'nightingale-raw-formatter';
import Level from 'nightingale-levels';
import { post } from 'request';

/* eslint camelcase: "off" */
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

const createHandler = slackConfig => record => {
  const body = createBody(record, slackConfig);
  post({
    url: slackConfig.webhookUrl,
    body,
    json: true
  }).on('error', err2 => console.error(err2.stack));
};

class SlackHandler {
  constructor(slackConfig, minLevel) {
    this.minLevel = void 0;
    this.handle = void 0;
    this.minLevel = minLevel;
    this.handle = createHandler(slackConfig);
  }

}

export default SlackHandler;
//# sourceMappingURL=index-node8.es.js.map
