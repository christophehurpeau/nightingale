import type { Handle, Handler, Level } from 'nightingale-types';
import type SlackConfig from './SlackConfig';
export { type default as SlackConfig } from './SlackConfig';
export { default as createBody } from './createBody';
export declare class SlackHandler implements Handler {
    minLevel: Level;
    handle: Handle;
    constructor(slackConfig: SlackConfig, minLevel: Level);
}
//# sourceMappingURL=index.d.ts.map