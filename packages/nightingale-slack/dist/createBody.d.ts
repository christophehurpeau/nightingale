import { Record } from 'nightingale-types';
import SlackConfig from './SlackConfig';
declare const _default: <T>(record: Record<T>, slackConfig: SlackConfig) => {
    channel: string | undefined;
    username: string | undefined;
    icon_url: string | undefined;
    icon_emoji: string | undefined;
    attachments: {
        fallback: string;
        title: string;
        color: string;
        text: string;
        mrkdwn_in: string[];
    }[];
};
export default _default;
