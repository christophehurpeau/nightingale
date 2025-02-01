/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

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
let Level = /*#__PURE__*/function (Level) {
  /** Log everything. Not a level. */
  Level[Level["ALL"] = 0] = "ALL";
  /** Trace information */
  Level[Level["TRACE"] = 10] = "TRACE";
  /** Detailed debug information */
  Level[Level["DEBUG"] = 100] = "DEBUG";
  /** Interesting events */
  Level[Level["INFO"] = 200] = "INFO";
  /** Normal but significant events */
  Level[Level["NOTICE"] = 250] = "NOTICE";
  /** Exceptional occurrences that are not errors (Use of deprecated APIs) */
  Level[Level["WARN"] = 300] = "WARN";
  /** Alias for WARN */
  Level[Level["WARNING"] = 300] = "WARNING";
  /** Runtime errors that do not require immediate action but should be logged and monitored */
  Level[Level["ERROR"] = 400] = "ERROR";
  /** Critical conditions. Example: Application component unavailable, unexpected exception */
  Level[Level["CRITICAL"] = 500] = "CRITICAL";
  /** Action must be taken immediately. Example: Entire website down, database unavailable, etc
   * This should trigger the SMS alerts and wake you up */
  Level[Level["FATAL"] = 550] = "FATAL";
  /** Alias for FATAL */
  Level[Level["ALERT"] = 550] = "ALERT";
  /** Emergency: system is unusable */
  Level[Level["EMERGENCY"] = 600] = "EMERGENCY";
  return Level;
}({});

export { Level };
//# sourceMappingURL=index-node20.mjs.map
