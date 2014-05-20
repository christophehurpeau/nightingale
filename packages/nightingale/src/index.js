var S = require('springbokjs-utils');
/*#if NODE */
var util = require('util');
/*#/if */

/**
 * Abstract Logger
 *
 * @class
 */
var Logger = S.newClass();
module.exports = Logger;

Logger.extendPrototype(/** @lends Logger.prototype */ {
    /**
     * Log a message
     *
     * @param {String} message
     * @param {String} logLevel
     * @return {Logger}
     */
	log(message, logLevel) {
        this.prefix(logLevel).write(message, logLevel).nl(logLevel);
    },

    /**
     * Add a new line
     *
     * @param {String} logLevel
     * @return {Logger}
     */
	nl(logLevel) {
        this.write("\n", logLevel);
        return this;
    },

    /**
     * Set the logger prefix
     *
     * @param {String} prefix
     * @return {Logger}
     */
	setPrefix(prefix, color) {
        if (!color) {
            color = this.gray;
        }
		this._prefix = color(prefix);
	},
	writable: /** @lends Logger.prototype */{
        /**
         * Write the current prefix, if exists
         * @see setPrefix
         *
         * @param {String} logLevel
         * @return {Logger}
         */
		prefix(logLevel) {
			this.time(logLevel);
            if (this._prefix) {
                this.write(this._prefix, logLevel);
            }
			return this;
		},
	},

    /**
     * Write the current time
     * @see setPrefix
     *
     * @param {Function} color
     * @return {Logger}
     */
	time(color) {
        if (!color) {
            color = this.gray;
        }
        this.write(color.bold(new Date().toTimeString().split(' ')[0]
                                /*new Date().toFormat('HH24:MI:SS')*/)+' ');
        return this;
    },

    /**
     * Log an info message
     *
     * @param {String} message
     * @return {Logger}
     */
    info(message) {
        return this.log('[info ] ' + message);
    },

    /**
     * Log an warn message
     *
     * @param {String} message
     * @return {Logger}
     */
	warn(message) {
        return this.log(this.red('[warn ] ' + message));
    },

    /**
     * Log an error message
     *
     * @param {String} message
     * @return {Logger}
     */
	error(message) {
        return this.log(this.red.bold('[error] ' + message), 'error');
    },

    /**
     * Log an fatal message
     *
     * @param {String} message
     * @return {Logger}
     */
	fatal(message) {
        return this.log(this.red.bold('[fatal] ' + message), 'fatal');
    },

    /**
     * Log an debug message
     *
     * @param {String} message
     * @return {Logger}
     */
	debug(message) {
		return this.log(this.gray('[debug] '+ message));
	},

    /**
     * Log an debugged var
     *
     * @param {String} message
     * @param {*} varValue
     * @return {Logger}
     */
    debugVar(varName, varValue){
		/*#if NODE */ varValue = util.inspect(varValue); /*#/if*/
		return this.log(this.cyan('[debug] ' + varName + ' = ' + varValue));
	},

    /**
     * Log an alert message
     *
     * @param {String} message
     * @return {Logger}
     */
	alert(message) {
		return this.log(this.purple.bold('[alert] ' + message));
	},

    /**
     * Log an sucess message
     *
     * @param {String} message
     * @return {Logger}
     */
	success(message) {
		return this.log(this.green.bold('[success] ' + message));
	}
});

Logger._inject = (object) => {
    var injectStyle1 = (prototype, styleName2) => {
        'bold italic underline inverse strikethrough'.split(' ').forEach((styleName) => {
            prototype[styleName] = (message) => {
                return object.style([styleName , styleName2], message);
            };
        });
    };
    injectStyle1(object.prototype);

    'black red green yellow blue magenta cyan white gray'.split(' ').forEach((styleName) => {
        object.prototype[styleName] = (message) => {
            return object.style([styleName], message);
        };
        injectStyle1(object.prototype[styleName], styleName);
    });
};


// logger.black.bold('Hello');

//Logger.blue.bold('test');