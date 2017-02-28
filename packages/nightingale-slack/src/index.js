/* eslint camelcase: "off" */
import markdownFormatter from 'nightingale-markdown-formatter/src';
import rawFormatter from 'nightingale-raw-formatter/src';
import { post } from 'request';
import levels from 'nightingale-levels';

const levelToSlackColor = {
  [levels.TRACE]: '#808080',
  [levels.DEBUG]: '#808080',
  [levels.INFO]: '#808080',
  [levels.WARN]: 'warning',
  [levels.ERROR]: 'danger',
  [levels.CRITICAL]: 'danger',
  [levels.FATAL]: 'danger',
  [levels.EMERGENCY]: 'danger',
};

const createHandler = (slackConfig) => record => {
  const markdown = markdownFormatter(record);
  const raw = rawFormatter(record);

  const body = {
    channel: slackConfig.channel,
    username: slackConfig.username,
    icon_url: slackConfig.iconUrl,
    icon_emoji: slackConfig.iconEmoji,
    attachments: [
      {
        fallback: raw,
        title: record.message,
        color: levelToSlackColor[record.level],
        text: markdown,
        mrkdwn_in: ['text'],
      },
    ],
  };

  post({ url: slackConfig.webhookUrl, body, json: true })
    .on('error', (err2) => console.error(err2.stack));
};

type SlackConfigType = {
  webhookUrl: string,
  channel: ?string,
  username: ?string,
  iconUrl: ?string,
  iconEmoji: ?string,
};

export default function SlackHandler(slackConfig: SlackConfigType, minLevel: number) {
  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}
