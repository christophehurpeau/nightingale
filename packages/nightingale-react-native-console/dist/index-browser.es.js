import formatterANSI from 'nightingale-ansi-formatter';
import { Platform } from 'react-native';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

/* eslint-disable @typescript-eslint/no-unsafe-argument */

const getStackTrace = e => {
  // eslint-disable-next-line no-prototype-builtins
  if (Platform.hasOwnProperty("constants")) {
    // RN version >= 0.63
    if (Platform.constants.reactNativeVersion.minor >= 64) {
      // RN version >= 0.64 -> Stacktrace as string
      return parseErrorStack(e.stack);
    }
    // RN version == 0.63 -> Stacktrace as string
    else return parseErrorStack(e);
  }
  // RN version < 0.63 -> Stacktrace as string
  else return parseErrorStack(e);
};
function parsedStackToString(stack) {
  return stack.map(frame => `  at ${frame.file}${frame.lineNumber ? `:${frame.lineNumber}${frame.column ? `:${frame.column}` : ""}` : ""}${frame.methodName ? ` in ${frame.methodName}` : ""}`).join("\n");
}
function consoleOutput(param) {
  // eslint-disable-next-line no-console
  console.log(...param);
}
const createHandle = () => {
  return record => {
    var _record$metadata;
    const metadataError = (_record$metadata = record.metadata) == null ? void 0 : _record$metadata.error;
    if (metadataError && metadataError instanceof Error) {
      symbolicateStackTrace(getStackTrace(metadataError)).then(({
        stack,
        codeFrame
      }) => {
        metadataError.stack = parsedStackToString(stack);
        consoleOutput([formatterANSI(record)]);
      }).catch(() => {
        metadataError.stack = undefined;
        consoleOutput([formatterANSI(record)]);
      });
    } else {
      consoleOutput([formatterANSI(record)]);
    }
  };
};
class ReactNativeConsoleHandler {
  constructor(minLevel) {
    this.minLevel = 0;
    this.minLevel = minLevel;
    this.isHandling = level => level >= minLevel;
    this.handle = createHandle();
  }
}

export { ReactNativeConsoleHandler };
//# sourceMappingURL=index-browser.es.js.map
