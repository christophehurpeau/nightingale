import Logger from './Logger';
import { parse as parseError } from 'alouette';

export default class NodeLogger extends Logger {
    /**
     * Log an error message
     *
     * @param {string|Error} message
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
     */
    error(message, context, contextStyles) {
        if (typeof message !== 'object') {
            message = message.message || message;
        } else {
            let parsedError = parseError(message);
            message = parsedError.toString();
        }
        return super.error(message, context, contextStyles);
    }
}
