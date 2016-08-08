'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = errorProcessor;

var _alouette = require('alouette');

/**
 * @function
 * @param record
 * @param context
*/function errorProcessor(record, context) {
    if (!record.metadata) {
        return;
    }

    record.extra = record.extra || {};

    var error = record.metadata.error || record.metadata.err;

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
            var parsedError = (0, _alouette.parse)(error);
            record.metadata.error = parsedError;
        } catch (err) {
            console.log(err.stack || err.message || err);
            record.metadata.error = error;
        }
    }
} /* eslint no-console: "off" */
//# sourceMappingURL=index.js.map