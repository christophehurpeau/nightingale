const LogLevel = Object.freeze({
    /** @type {Number} Trace information */
    TRACE: 10,
    /** @type {Number} Detailed debug information */
    DEBUG: 100,
    /** @type {Number} Normal but significant events */
    INFO: 200,
    /** @type {Number} Exceptional occurrences that are not errors (Use of deprecated APIs) */
    WARN: 300,
    /** @type {Number} Alias for WARN */
    WARNING: 300,
    /** @type {Number} Runtime errors that do not require immediate action but should be logged and monitored */
    ERROR: 400,
    /** @type {Number} Critical conditions. Example: Application component unavailable, unexpected exception */
    CRITICAL: 500,
    /** @type {Number} Action must be taken immediately. Example: Entire website down, database unavailable, etc
      *                 This should trigger the SMS alerts and wake you up */
    FATAL: 550,
    /** @type {Number} Alias for FATAL */
    ALERT: 550,
    /** @type {Number} Emergency: system is unusable */
    EMERGENCY: 600,
});
export default LogLevel;
