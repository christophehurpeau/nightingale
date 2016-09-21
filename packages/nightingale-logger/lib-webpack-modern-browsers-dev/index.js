var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import util from 'util';
import levels from 'nightingale-levels';

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
    global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function () {
        return { handlers: [], processors: [] };
    };
}

function getConfigForLogger(key) {
    return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);
}

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
export default class Logger {

    /**
     * Create a new Logger
     *
     * @param {string} key
     * @param {string} [displayName]
     */
    constructor(key, displayName) {
        if (!(typeof key === 'string')) {
            throw new TypeError('Value of argument "key" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(key));
        }

        if (!(displayName == null || typeof displayName === 'string')) {
            throw new TypeError('Value of argument "displayName" violates contract.\n\nExpected:\n?string\n\nGot:\n' + _inspect(displayName));
        }

        this.key = key;
        this.displayName = displayName;

        if (!(this.displayName == null || typeof this.displayName === 'string')) {
            throw new TypeError('Value of "this.displayName" violates contract.\n\nExpected:\n?string\n\nGot:\n' + _inspect(this.displayName));
        }
    }

    getConfig() {
        return getConfigForLogger(this.key);
    }

    /**
     * Create a child logger
     *
     * @param {string} childSuffixKey
     * @param {string} [childDisplayName]
     * @returns {Logger}
     */
    child(childSuffixKey, childDisplayName) {
        if (!(typeof childSuffixKey === 'string')) {
            throw new TypeError('Value of argument "childSuffixKey" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(childSuffixKey));
        }

        if (!(childDisplayName == null || typeof childDisplayName === 'string')) {
            throw new TypeError('Value of argument "childDisplayName" violates contract.\n\nExpected:\n?string\n\nGot:\n' + _inspect(childDisplayName));
        }

        return new Logger(`${ this.key }.${ childSuffixKey }`, childDisplayName);
    }

    /**
     * Create a new Logger with the same key a this attached context
     *
     * @example
     * const loggerMyService = new Logger('app.myService');
     * function someAction(arg1) {
     *     const logger = loggerMyService.context({ arg1 });
     *     logger.info('starting');
     *     // do stuff
     *     logger.info('done');
     * }
     *
     * @param {Object} context
     * @returns {Logger}
     */
    context(context) {
        if (!(context instanceof Object)) {
            throw new TypeError('Value of argument "context" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(context));
        }

        var logger = new Logger(this.key);
        logger.setContext(context);
        return logger;
    }

    /**
     * Set the context of this logger
     *
     * @param {Object} context
     */
    setContext(context) {
        if (!(context instanceof Object)) {
            throw new TypeError('Value of argument "context" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(context));
        }

        this._context = context;
    }

    /**
     * Extends existing context of this logger
     *
     * @param {Object} extendedContext
     */
    extendsContext(extendedContext) {
        if (!(extendedContext instanceof Object)) {
            throw new TypeError('Value of argument "extendedContext" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(extendedContext));
        }

        Object.assign(this._context, extendedContext);
    }

    /**
     * Handle a record
     *
     * Use this only if you know what you are doing.
     *
     * @param {Object} record
     */
    addRecord(record) {
        if (!(record instanceof Object)) {
            throw new TypeError('Value of argument "record" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(record));
        }

        var { handlers, processors } = this.getConfig();
        handlers = handlers.filter(handler => {
            return handler.isHandling(record.level, this.key);
        });
        if (handlers.length === 0) {
            if (record.level > levels.ERROR) {
                // eslint-disable-next-line no-console
                console.log('[nightingale] no logger for > error level.', {
                    key: record.key,
                    message: record.message
                });
            }
            return;
        }

        if (processors) {
            processors.forEach(process => {
                return process(record, record.context);
            });
        }

        handlers.some(handler => {
            return handler.handle(record) === false;
        });
    }

    /**
     * Log a message
     *
     * @param {string} message
     * @param {Object} metadata
     * @param {int} [level]
     * @param {Object} [options]
     * @return {Logger}
     */
    log(message, metadata, level = levels.INFO, options = undefined) {
        if (!(typeof message === 'string')) {
            throw new TypeError('Value of argument "message" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(message));
        }

        if (!(metadata == null || metadata instanceof Object)) {
            throw new TypeError('Value of argument "metadata" violates contract.\n\nExpected:\n?Object\n\nGot:\n' + _inspect(metadata));
        }

        if (!(typeof level === 'number')) {
            throw new TypeError('Value of argument "level" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(level));
        }

        if (!(options == null || options instanceof Object)) {
            throw new TypeError('Value of argument "options" violates contract.\n\nExpected:\n?Object\n\nGot:\n' + _inspect(options));
        }

        var context = metadata && metadata.context;
        if (metadata) {
            delete metadata.context;
        }

        var record = {
            level: level,
            key: this.key,
            displayName: this.displayName,
            datetime: new Date(),
            message: message,
            context: context || this._context,
            metadata: metadata,
            extra: {}
        };

        if (options) {
            record = Object.assign(options, record);
        }

        this.addRecord(record);
        return this;
    }

    /**
     * Log a trace message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    trace(message, metadata, metadataStyles) {
        return this.log(message, metadata, levels.TRACE, { metadataStyles });
    }

    /**
     * Log a debug message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    debug(message, metadata, metadataStyles) {
        return this.log(message, metadata, levels.DEBUG, { metadataStyles });
    }

    /**
     * Log an info message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    info(message, metadata, metadataStyles) {
        return this.log(message, metadata, levels.INFO, { metadataStyles });
    }

    /**
     * Log a warn message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    warn(message, metadata, metadataStyles) {
        return this.log(message, metadata, levels.WARN, { metadataStyles });
    }

    /**
     * Log an error message
     *
     * @param {string|Error} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    error(message, metadata = {}, metadataStyles) {
        if (message instanceof Error) {
            metadata.error = message;
            message = `${ metadata.error.name }: ${ metadata.error.message }`;
        }
        return this.log(message, metadata, levels.ERROR, { metadataStyles });
    }

    /**
     * Log an alert message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    alert(message, metadata, metadataStyles) {
        return this.log(message, metadata, levels.ALERT, { metadataStyles });
    }

    /**
     * Log a fatal message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    fatal(message, metadata, metadataStyles) {
        return this.log(message, metadata, levels.FATAL, { metadataStyles });
    }

    /**
     * Log an inspected value
     *
     * @param {*} value
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    inspectValue(value, metadata, metadataStyles) {
        // Note: inspect is a special function for node:
        // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
        value = util.inspect(value, { depth: 6 });
        return this.log(value, metadata, levels.DEBUG, { metadataStyles, styles: ['gray'] });
    }

    /**
     * Log a debugged var
     *
     * @param {string} varName
     * @param {*} varValue
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    inspectVar(varName, varValue, metadata, metadataStyles) {
        varValue = util.inspect(varValue, { depth: 6 });
        return this.log(`${ varName } = ${ varValue }`, metadata, levels.DEBUG, { metadataStyles, styles: ['cyan'] });
    }

    /**
     * Alias for infoSuccess
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    success(message, metadata, metadataStyles) {
        return this.infoSuccess(message, metadata, metadataStyles);
    }

    /**
     * Log an info success message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    infoSuccess(message, metadata, metadataStyles) {
        return this.log(message, metadata, levels.INFO, {
            metadataStyles,
            symbol: '✔',
            styles: ['green', 'bold']
        });
    }

    /**
     * Log an debug success message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    debugSuccess(message, metadata, metadataStyles) {
        return this.log(message, metadata, levels.DEBUG, {
            metadataStyles,
            symbol: '✔',
            styles: ['green']
        });
    }

    /**
     * Alias for infoFail
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    fail(message, metadata, metadataStyles) {
        return this.infoFail(message, metadata, metadataStyles);
    }

    /**
     * Log an info fail message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    infoFail(message, metadata, metadataStyles) {
        return this.log(message, metadata, levels.INFO, {
            metadataStyles,
            symbol: '✖',
            styles: ['red', 'bold']
        });
    }

    /**
     * Log an debug fail message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    debugFail(message, metadata, metadataStyles) {
        return this.log(message, metadata, levels.DEBUG, {
            metadataStyles,
            symbol: '✖',
            styles: ['red']
        });
    }

    /**
     * @param {string} [message]
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @param {number} [level = levels.DEBUG]
     * @returns {*} time to pass to timeEnd
     */
    time(message, metadata, metadataStyles, level = levels.DEBUG) {
        if (message) {
            this.log(message, metadata, level, { metadataStyles });
        }

        return Date.now();
    }

    infoTime(message, metadata, metadataStyles) {
        if (!(typeof message === 'string')) {
            throw new TypeError('Value of argument "message" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(message));
        }

        if (!(metadata == null || metadata instanceof Object)) {
            throw new TypeError('Value of argument "metadata" violates contract.\n\nExpected:\n?Object\n\nGot:\n' + _inspect(metadata));
        }

        if (!(metadataStyles == null || metadataStyles instanceof Object)) {
            throw new TypeError('Value of argument "metadataStyles" violates contract.\n\nExpected:\n?Object\n\nGot:\n' + _inspect(metadataStyles));
        }

        return this.time(message, metadata, metadataStyles, levels.INFO);
    }

    /**
     * Finds difference between when this method
     * was called and when the respective time method
     * was called, then logs out the difference
     * and deletes the original record
     *
     * @param {number=} time return of previous call to time()
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @param {number} [level = levels.DEBUG]
     */
    timeEnd(time, message, metadata = {}, metadataStyles, level = levels.DEBUG, options) {
        var now = Date.now();

        var diffTime = now - time;

        if (diffTime < 1000) {
            metadata.readableTime = `${ diffTime }ms`;
        } else {
            var seconds = diffTime > 1000 && Math.floor(diffTime / 1000);
            var ms = diffTime - NaN;
            metadata.readableTime = `${ '' }${ ms }ms`;
        }

        metadata.timeMs = diffTime;
        this.log(message, metadata, level, _extends({}, options, { metadataStyles }));
    }

    /**
     * Like timeEnd, but with INFO level
     */
    infoTimeEnd(time, message, metadata, metadataStyles) {
        if (!(typeof time === 'number')) {
            throw new TypeError('Value of argument "time" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(time));
        }

        if (!(typeof message === 'string')) {
            throw new TypeError('Value of argument "message" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(message));
        }

        if (!(metadata == null || metadata instanceof Object)) {
            throw new TypeError('Value of argument "metadata" violates contract.\n\nExpected:\n?Object\n\nGot:\n' + _inspect(metadata));
        }

        if (!(metadataStyles == null || metadataStyles instanceof Object)) {
            throw new TypeError('Value of argument "metadataStyles" violates contract.\n\nExpected:\n?Object\n\nGot:\n' + _inspect(metadataStyles));
        }

        return this.timeEnd(time, message, metadata, metadataStyles, levels.INFO);
    }

    /**
     * Like timeEnd, but with INFO level
     */
    infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
        if (!(typeof time === 'number')) {
            throw new TypeError('Value of argument "time" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(time));
        }

        if (!(typeof message === 'string')) {
            throw new TypeError('Value of argument "message" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(message));
        }

        if (!(metadata == null || metadata instanceof Object)) {
            throw new TypeError('Value of argument "metadata" violates contract.\n\nExpected:\n?Object\n\nGot:\n' + _inspect(metadata));
        }

        if (!(metadataStyles == null || metadataStyles instanceof Object)) {
            throw new TypeError('Value of argument "metadataStyles" violates contract.\n\nExpected:\n?Object\n\nGot:\n' + _inspect(metadataStyles));
        }

        return this.timeEnd(time, message, metadata, metadataStyles, levels.INFO, {
            symbol: '✔',
            styles: ['green', 'bold']
        });
    }

    /**
     * Log an enter in a function
     *
     * @example
     * class A {
     *   method(arg1) {
     *     logger.enter(method, { arg1 });
     *     // Do your stuff
     *   }
     * }
     *
     * @param {Function} fn
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    enter(fn, metadata = {}, metadataStyles) {
        metadata = _extends({
            functionName: fn.name
        }, metadata);
        return this.log('enter', metadata, levels.TRACE, { metadataStyles });
    }

    /**
     * Log an exit in a function
     *
     * @example
     * const logger = new ConsoleLogger('myNamespace.A');
     * class A {
     *   method(arg1) {
     *     // Do your stuff
     *     logger.exit(method, { arg1 });
     *   }
     * }
     *
     *
     * @param {Function} fn
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */
    exit(fn, metadata, metadataStyles) {
        metadata = _extends({
            functionName: fn.name
        }, metadata);
        return this.log('exit', metadata, levels.TRACE, { metadataStyles });
    }

    /**
     * Wrap around a function to log enter and exit of a function
     *
     * @example
     * const logger = new ConsoleLogger('myNamespace.A');
     * class A {
     *   method() {
     *     logger.wrap(method, () => {
     *       // Do your stuff
     *     });
     *   }
     * }
     *
     * @param {Function} fn
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @param {Function} callback
     */
    wrap(fn, metadata, metadataStyles, callback) {
        if (typeof metadata === 'function') {
            callback = metadata;
            metadata = undefined;
        } else if (typeof metadataStyles === 'function') {
            callback = metadataStyles;
            metadataStyles = undefined;
        }

        this.enter(fn, metadata, metadataStyles);
        callback();
        this.exit(fn);
    }
}

function _inspect(input, depth) {
    var maxDepth = 4;
    var maxKeys = 15;

    if (depth === undefined) {
        depth = 0;
    }

    depth += 1;

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
        return typeof input;
    } else if (Array.isArray(input)) {
        if (input.length > 0) {
            var _ret = function () {
                if (depth > maxDepth) return {
                        v: '[...]'
                    };

                var first = _inspect(input[0], depth);

                if (input.every(item => _inspect(item, depth) === first)) {
                    return {
                        v: first.trim() + '[]'
                    };
                } else {
                    return {
                        v: '[' + input.slice(0, maxKeys).map(item => _inspect(item, depth)).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']'
                    };
                }
            }();

            if (typeof _ret === "object") return _ret.v;
        } else {
            return 'Array';
        }
    } else {
        var keys = Object.keys(input);

        if (!keys.length) {
            if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
                return input.constructor.name;
            } else {
                return 'Object';
            }
        }

        if (depth > maxDepth) return '{...}';
        var indent = '  '.repeat(depth - 1);
        var entries = keys.slice(0, maxKeys).map(key => {
            return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
        }).join('\n  ' + indent);

        if (keys.length >= maxKeys) {
            entries += '\n  ' + indent + '...';
        }

        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
            return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
        } else {
            return '{\n  ' + indent + entries + '\n' + indent + '}';
        }
    }
}
//# sourceMappingURL=index.js.map