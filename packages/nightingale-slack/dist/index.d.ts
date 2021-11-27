import type { Handle, Handler, Level } from 'nightingale-types';
import type SlackConfig from './SlackConfig';
export { default as createBody } from './createBody';
export declare class SlackHandler implements Handler {
    minLevel: Level;
    handle: Handle;
    constructor(slackConfig: SlackConfig, minLevel: Level);
}
/** @deprecated use named export instead */
export default SlackHandler;
//# sourceMappingURL=index.d.ts.map