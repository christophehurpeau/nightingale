import formatterANSI from 'nightingale-ansi-formatter';
import { Platform } from 'react-native';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

/* eslint-disable @typescript-eslint/no-unsafe-argument */

var getStackTrace = function getStackTrace(e) {
  // eslint-disable-next-line no-prototype-builtins
  if (Platform.hasOwnProperty('constants')) {
    // RN version >= 0.63
    if (Platform.constants.reactNativeVersion.minor >= 64) {
      // RN version >= 0.64 -> Stacktrace as string
      return parseErrorStack(e.stack);
    } // RN version == 0.63 -> Stacktrace as string
    else return parseErrorStack(e);
  } // RN version < 0.63 -> Stacktrace as string
  else return parseErrorStack(e);
};

function parsedStackToString(stack) {
  return stack.map(function (frame) {
    return `  at ${frame.file}${frame.lineNumber ? `:${frame.lineNumber}${frame.column ? `:${frame.column}` : ''}` : ''}${frame.methodName ? ` in ${frame.methodName}` : ''}`;
  }).join('\n');
}

function consoleOutput(param) {
  var _console;

  // eslint-disable-next-line no-console
  (_console = console).log.apply(_console, param);
}

var createHandle = function createHandle() {
  return function (record) {
    var _record$metadata, _record$metadata2;

    var error = (_record$metadata = record.metadata) == null ? void 0 : _record$metadata.error;

    if (error && error instanceof Error) {
      (_record$metadata2 = record.metadata) == null ? true : delete _record$metadata2.error;
      symbolicateStackTrace(getStackTrace(error)).then(function (_ref) {
        var stack = _ref.stack;
            _ref.codeFrame;
        error.stack = parsedStackToString(stack);
        consoleOutput([formatterANSI(record)]);
      }).catch(function () {
        consoleOutput([formatterANSI(record)]);
      });
    } else {
      consoleOutput([formatterANSI(record)]);
    }
  };
};

var ReactNativeConsoleHandler = function ReactNativeConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.minLevel = minLevel;

  this.isHandling = function (level) {
    return level >= minLevel;
  };

  this.handle = createHandle();
};

export { ReactNativeConsoleHandler };
//# sourceMappingURL=index-browser-dev.es.js.map
