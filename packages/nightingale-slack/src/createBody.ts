/* eslint-disable camelcase */
import { Level, MarkdownFormatter, RawFormatter } from "nightingale";
import type { LogRecord, Metadata } from "nightingale-types";
import type { SlackConfig } from "./SlackConfig";

const levelToSlackColor: Record<number, string> = {
  [Level.TRACE]: "#808080",
  [Level.DEBUG]: "#808080",
  [Level.INFO]: "#808080",
  [Level.WARN]: "warning",
  [Level.ERROR]: "danger",
  [Level.CRITICAL]: "danger",
  [Level.FATAL]: "danger",
  [Level.EMERGENCY]: "danger",
};

export default function createBody<T extends Metadata>(
  record: LogRecord<T>,
  slackConfig: SlackConfig,
): Record<string, unknown> {
  const markdown = MarkdownFormatter.format(record);
  const raw = RawFormatter.format(record);

  return {
    channel: slackConfig.channel,
    username: slackConfig.username,
    icon_url: slackConfig.iconUrl,
    icon_emoji: slackConfig.iconEmoji,
    attachments: [
      {
        fallback: raw[0],
        title: record.message,
        color: levelToSlackColor[record.level],
        text: markdown[0],
        mrkdwn_in: ["text"],
      },
    ],
  };
}
