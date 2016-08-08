/* eslint no-console: "off" */
import { parse as parseError } from 'alouette';

export default function errorProcessor(record, context) {
    if (!record.metadata) {
        return;
    }

    record.extra = record.extra || {};

    const error = record.metadata.error || record.metadata.err;

    if (!(error instanceof Error)) {
        return;
    }

    delete record.metadata.error;
    delete record.metadata.err;

    if (error.originalError) {
        // error was already parsed
        record.metadata.error = error;
    } else {
        try {
            const parsedError = parseError(error);
            record.metadata.error = parsedError;
        } catch (err) {
            console.log(err.stack || err.message || err);
            record.metadata.error = error;
        }
    }
}
