/**
 * List of levels
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
"use strict";

var _Object$freeze = require("babel-runtime/core-js/object/freeze").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogLevel = _Object$freeze({
  /** @type {Number} Log everything. Not a level. */
  ALL: 0,

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
  EMERGENCY: 600
});
exports.default = LogLevel;
module.exports = exports.default;
//# sourceMappingURL=LogLevel.js.map