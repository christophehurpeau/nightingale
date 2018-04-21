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
var Level;

(function (Level) {
  Level[Level["ALL"] = 0] = "ALL";
  Level[Level["TRACE"] = 10] = "TRACE";
  Level[Level["DEBUG"] = 100] = "DEBUG";
  Level[Level["INFO"] = 200] = "INFO";
  Level[Level["NOTICE"] = 250] = "NOTICE";
  Level[Level["WARN"] = 300] = "WARN";
  Level[Level["WARNING"] = 300] = "WARNING";
  Level[Level["ERROR"] = 400] = "ERROR";
  Level[Level["CRITICAL"] = 500] = "CRITICAL";
  Level[Level["FATAL"] = 550] = "FATAL";
  Level[Level["ALERT"] = 550] = "ALERT";
  Level[Level["EMERGENCY"] = 600] = "EMERGENCY";
})(Level || (Level = {}));

var Level$1 = Level;

export default Level$1;
//# sourceMappingURL=index-node8.es.js.map
