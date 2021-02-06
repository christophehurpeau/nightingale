'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const SentryNode = require('@sentry/node');
const types = require('@sentry/types');
const Level = require('nightingale-levels');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      n[k] = e[k];
    });
  }
  n['default'] = e;
  return n;
}

const SentryNode__namespace = /*#__PURE__*/_interopNamespace(SentryNode);
const Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);

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

    return ((_record$metadata = record.metadata) === null || _record$metadata === void 0 ? void 0 : _record$metadata.error) !== undefined;
  },
  shouldSendAsBreadcrumb = () => false
} = {}) => {
  return record => {
    const {
      key,
      level,
      metadata,
      extra
    } = record;

    if (shouldSendAsException(record)) {
      const error = (metadata === null || metadata === void 0 ? void 0 : metadata.error) || record.message;
      const extraData = { ...metadata,
        ...extra
      };
      delete extraData.error;
      Sentry.captureException(error, {
        level: mapToSentryLevel[level] || types.Severity.Error,
        user: getUser(record),
        tags: {
          loggerKey: key,
          ...getTags(record)
        },
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

    if (typeof Sentry === 'string') {
      console.warn('nightingale-sentry: Passing DSN directly is deprecated, pass Sentry instead and init in your app.');
      SentryNode.init({
        dsn: Sentry
      });
      this.handle = createHandler(SentryNode__namespace, options);
    } else {
      this.handle = createHandler(Sentry, options);
    }
  }

}

exports.default = SentryHandler;
//# sourceMappingURL=index-node12-dev.cjs.js.map
