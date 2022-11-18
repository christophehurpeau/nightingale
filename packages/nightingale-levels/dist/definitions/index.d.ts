/**
 * @enum {number} List of Levels
 *
 * <ul>
 * <li>ALL: Log everything. Not a level.</li>
 * <li>TRACE: Trace information</li>
 * <li>DEBUG: Detailed debug information</li>
 * <li>INFO: Normal but significant events</li>
 * <li>WARN: Exceptional occurrences that are not errors (Use of deprecated APIs)</li>
 * <li>WARNING: Alias for WARN</li>
 * <li>ERROR: Runtime errors that do not require immediate action but should be logged and monitored</li>
 * <li>CRITICAL: Critical conditions. Example: Application component unavailable, unexpected exception</li>
 * <li>FATAL: Action must be taken immediately. Example: Entire website down, database unavailable, etc
 *          This should trigger the SMS alerts and wake you up</li>
 * <li>ALERT: Alias for FATAL</li>
 * <li>EMERGENCY: Emergency: system is unusable</li>
 * </ul>
 *
 */
export declare enum Level {
    /** Log everything. Not a level. */
    ALL = 0,
    /** Trace information */
    TRACE = 10,
    /** Detailed debug information */
    DEBUG = 100,
    /** Interesting events */
    INFO = 200,
    /** Normal but significant events */
    NOTICE = 250,
    /** Exceptional occurrences that are not errors (Use of deprecated APIs) */
    WARN = 300,
    /** Alias for WARN */
    WARNING = 300,
    /** Runtime errors that do not require immediate action but should be logged and monitored */
    ERROR = 400,
    /** Critical conditions. Example: Application component unavailable, unexpected exception */
    CRITICAL = 500,
    /** Action must be taken immediately. Example: Entire website down, database unavailable, etc
     * This should trigger the SMS alerts and wake you up */
    FATAL = 550,
    /** Alias for FATAL */
    ALERT = 550,
    /** Emergency: system is unusable */
    EMERGENCY = 600
}
export default Level;
//# sourceMappingURL=index.d.ts.map