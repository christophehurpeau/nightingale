import type { LogRecord, Metadata } from 'nightingale-types';
import type SlackConfig from './SlackConfig';
export default function createBody<T extends Metadata>(record: LogRecord<T>, slackConfig: SlackConfig): Record<string, unknown>;
//# sourceMappingURL=createBody.d.ts.map