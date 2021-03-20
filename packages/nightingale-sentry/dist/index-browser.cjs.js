'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/esm/extends');
var types = require('@sentry/types');
var Level = require('nightingale-levels');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);

const mapToSentryLevel = {
  [Level__default.TRACE]: types.Severity.Debug,
  [Level__default.DEBUG]: types.Severity.Debug,
  [Level__default.INFO]: types.Severity.Info,
  [Level__default.NOTICE]: types.Severity.Log,
  [Level__default.WARNING]: types.Severity.Warning,
  [Level__default.ERROR]: types.Severity.Error,
  [Level__default.CRITICAL]: types.Severity.Critical,
  [Level__default.FATAL]: types.Severity.Fatal,
  [Level__default.EMERGENCY]: types.Severity.Critical,
  // not a level
  [Level__default.ALL]: types.Severity.Error
};

const createHandler = (Sentry, {
  getUser = () => undefined,
  getTags = () => ({}),
  getBreadcrumbCategory = () => undefined,
  getBreadcrumbType = () => undefined,
  shouldSendAsException = record => {
    var _record$metadata;

    return ((_record$metadata = record.metadata) == null ? void 0 : _record$metadata.error) !== undefined && record.metadata.unhandled !== true;
  },
  shouldSendAsBreadcrumb = () => false
} = {}) => {
  return record => {
    const key = record.key,
          level = record.level,
          metadata = record.metadata,
          extra = record.extra;

    if (shouldSendAsException(record)) {
      const error = (metadata == null ? void 0 : metadata.error) || record.message;

      const extraData = _extends__default({}, metadata, extra);

      delete extraData.error;
      Sentry.captureException(error, {
        level: mapToSentryLevel[level] || types.Severity.Error,
        user: getUser(record),
        tags: _extends__default({
          loggerKey: key
        }, getTags(record)),
        extra: extraData
      });
    } else if (shouldSendAsBreadcrumb(record)) {
      Sentry.addBreadcrumb({
        level: mapToSentryLevel[level] || types.Severity.Error,
        category: getBreadcrumbCategory(record),
        type: getBreadcrumbType(record),
        message: record.message,
        data: record.metadata,
        timestamp: record.datetime.getTime()
      });
    }
  };
};

class SentryHandler {
  constructor(Sentry, minLevel, options) {
    this.minLevel = minLevel;
    this.handle = createHandler(Sentry, options);
  }

}

exports.default = SentryHandler;
//# sourceMappingURL=index-browser.cjs.js.map
