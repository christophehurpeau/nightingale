import { MarkdownFormatter, RawFormatter, Level } from 'nightingale';

/* eslint-disable camelcase */
const levelToSlackColor = {
  [Level.TRACE]: "#808080",
  [Level.DEBUG]: "#808080",
  [Level.INFO]: "#808080",
  [Level.WARN]: "warning",
  [Level.ERROR]: "danger",
  [Level.CRITICAL]: "danger",
  [Level.FATAL]: "danger",
  [Level.EMERGENCY]: "danger"
};
function createBody(record, slackConfig) {
  const markdown = MarkdownFormatter.format(record);
  const raw = RawFormatter.format(record);
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
      mrkdwn_in: ["text"]
    }]
  };
}

const createHandler = slackConfig => record => {
  const body = createBody(record, slackConfig);

  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  fetch(slackConfig.webhookUrl, {
    method: "POST",
    body: JSON.stringify(body)
  }).catch(error => {
    console.error(error);
  });
};
class SlackHandler {
  constructor(slackConfig, minLevel) {
    this.minLevel = minLevel;
    this.handle = createHandler(slackConfig);
  }
}

export { SlackHandler, createBody };
//# sourceMappingURL=index-node20.mjs.map
