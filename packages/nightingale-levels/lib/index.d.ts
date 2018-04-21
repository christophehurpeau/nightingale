declare module "nightingale-levels" {
  enum Level {
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
    ERROR= 400,
    /** Critical conditions. Example: Application component unavailable, unexpected exception */
    CRITICAL = 500,
    /** Action must be taken immediately. Example: Entire website down, database unavailable, etc
     *                 This should trigger the SMS alerts and wake you up */
    FATAL = 550,
    /** Alias for FATAL */
    ALERT = 550,
    /** Emergency: system is unusable */
    EMERGENCY = 600,
  }

  export = Level;
}
