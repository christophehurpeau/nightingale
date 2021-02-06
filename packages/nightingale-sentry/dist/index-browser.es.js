import _extends from '@babel/runtime/helpers/esm/extends';
import { Severity } from '@sentry/types';
import Level from 'nightingale-levels';

var mapToSentryLevel = {
  [Level.TRACE]: Severity.Debug,
  [Level.DEBUG]: Severity.Debug,
  [Level.INFO]: Severity.Info,
  [Level.NOTICE]: Severity.Log,
  [Level.WARNING]: Severity.Warning,
  [Level.ERROR]: Severity.Error,
  [Level.CRITICAL]: Severity.Critical,
  [Level.FATAL]: Severity.Fatal,
  [Level.EMERGENCY]: Severity.Critical,
  // not a level
  [Level.ALL]: Severity.Error
};

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

    return ((_record$metadata = record.metadata) === null || _record$metadata === void 0 ? void 0 : _record$metadata.error) !== undefined && record.metadata.unhandled !== true;
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
      var error = (metadata === null || metadata === void 0 ? void 0 : metadata.error) || record.message;

      var extraData = _extends({}, metadata, extra);

      delete extraData.error;
      Sentry.captureException(error, {
        level: mapToSentryLevel[level] || Severity.Error,
        user: getUser(record),
        tags: _extends({
          loggerKey: key
        }, getTags(record)),
        extra: extraData
      });
    } else if (shouldSendAsBreadcrumb(record)) {
      Sentry.addBreadcrumb({
        level: mapToSentryLevel[level] || Severity.Error,
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

export default SentryHandler;
//# sourceMappingURL=index-browser.es.js.map
