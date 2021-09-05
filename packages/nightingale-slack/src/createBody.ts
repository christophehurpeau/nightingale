/* eslint-disable camelcase */
import { Level } from 'nightingale-levels';
import markdownFormatter from 'nightingale-markdown-formatter';
import rawFormatter from 'nightingale-raw-formatter';
import type { LogRecord, Metadata } from 'nightingale-types';
import type SlackConfig from './SlackConfig';

const levelToSlackColor: Record<number, string> = {
  [Level.TRACE]: '#808080',
  [Level.DEBUG]: '#808080',
  [Level.INFO]: '#808080',
  [Level.WARN]: 'warning',
  [Level.ERROR]: 'danger',
  [Level.CRITICAL]: 'danger',
  [Level.FATAL]: 'danger',
  [Level.EMERGENCY]: 'danger',
};

export default function createBody<T extends Metadata>(
  record: LogRecord<T>,
  slackConfig: SlackConfig,
): Record<string, unknown> {
  const markdown = markdownFormatter(record);
  const raw = rawFormatter(record);

  return {
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
}
