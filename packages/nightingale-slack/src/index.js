import { post } from 'request';
import createBody from './createBody';

const createHandler = slackConfig => record => {
  const body = createBody(record, slackConfig);

  post({ url: slackConfig.webhookUrl, body, json: true }).on('error', err2 =>
    console.error(err2.stack),
  );
};

type SlackConfigType = {|
  webhookUrl: string,
  channel?: ?string,
  username?: ?string,
  iconUrl?: ?string,
  iconEmoji?: ?string,
|};

export default function SlackHandler(slackConfig: SlackConfigType, minLevel: number) {
  this.minLevel = minLevel;
  this.handle = createHandler(slackConfig);
}
