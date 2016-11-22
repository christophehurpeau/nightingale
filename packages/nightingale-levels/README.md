# nightingale-levels

Follows the logging levels described by [RFC 5424](https://tools.ietf.org/html/rfc5424)

- *TRACE* (10): Trace information
- *DEBUG* (100): Detailed debug information
- *INFO* (200): Normal but significant events
- *NOTICE* (250): Normal but significant events
- *WARN* (300): Exceptional occurrences that are not errors (Use of deprecated APIs)
- *WARNING* (300): Alias for WARN
- *ERROR* (400): Runtime errors that do not require immediate action but should be logged and monitored
- *CRITICAL* (500): Critical conditions. Example: Application component unavailable, unexpected exception
- *FATAL* (550): Action must be taken immediately. Example: Entire website down, database unavailable
             This should trigger the SMS alerts and wake you up</li>
- *ALERT* (550): Alias for FATAL
- *EMERGENCY* (600): Emergency: system is unusable
- *ALL*: Log everything. Not a level.
