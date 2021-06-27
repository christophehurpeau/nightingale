'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/esm/extends');
var types = require('@sentry/types');
var Level = require('nightingale-levels');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);

var _mapToSentryLevel;
var mapToSentryLevel = (_mapToSentryLevel = {}, _mapToSentryLevel[Level__default.TRACE] = types.Severity.Debug, _mapToSentryLevel[Level__default.DEBUG] = types.Severity.Debug, _mapToSentryLevel[Level__default.INFO] = types.Severity.Info, _mapToSentryLevel[Level__default.NOTICE] = types.Severity.Log, _mapToSentryLevel[Level__default.WARNING] = types.Severity.Warning, _mapToSentryLevel[Level__default.ERROR] = types.Severity.Error, _mapToSentryLevel[Level__default.CRITICAL] = types.Severity.Critical, _mapToSentryLevel[Level__default.FATAL] = types.Severity.Fatal, _mapToSentryLevel[Level__default.EMERGENCY] = types.Severity.Critical, _mapToSentryLevel[Level__default.ALL] = types.Severity.Error, _mapToSentryLevel);

var createHandler = function createHandler(Sentry, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$getUser = _ref.getUser,
      getUser = _ref$getUser === void 0 ? function () {
    return undefined;
  } : _ref$getUser,
      _ref$getTags = _ref.getTags,
      getTags = _ref$getTags === void 0 ? function () {
    return {};
  } : _ref$getTags,
      _ref$getBreadcrumbCat = _ref.getBreadcrumbCategory,
      getBreadcrumbCategory = _ref$getBreadcrumbCat === void 0 ? function () {
    return undefined;
  } : _ref$getBreadcrumbCat,
      _ref$getBreadcrumbTyp = _ref.getBreadcrumbType,
      getBreadcrumbType = _ref$getBreadcrumbTyp === void 0 ? function () {
    return undefined;
  } : _ref$getBreadcrumbTyp,
      _ref$shouldSendAsExce = _ref.shouldSendAsException,
      shouldSendAsException = _ref$shouldSendAsExce === void 0 ? function (record) {
    var _record$metadata;

    return ((_record$metadata = record.metadata) == null ? void 0 : _record$metadata.error) !== undefined && record.metadata.unhandled !== true;
  } : _ref$shouldSendAsExce,
      _ref$shouldSendAsBrea = _ref.shouldSendAsBreadcrumb,
      shouldSendAsBreadcrumb = _ref$shouldSendAsBrea === void 0 ? function () {
    return false;
  } : _ref$shouldSendAsBrea;

  return function (record) {
    var key = record.key,
        level = record.level,
        metadata = record.metadata,
        extra = record.extra;

    if (shouldSendAsException(record)) {
      var error = (metadata == null ? void 0 : metadata.error) || record.message;

      var extraData = _extends__default({}, metadata, extra);

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

var SentryHandler = function SentryHandler(Sentry, minLevel, options) {
  this.minLevel = minLevel;
  this.handle = createHandler(Sentry, options);
};

exports.default = SentryHandler;
//# sourceMappingURL=index-browser-dev.cjs.js.map
