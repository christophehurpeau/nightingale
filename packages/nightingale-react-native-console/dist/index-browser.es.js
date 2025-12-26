import { ANSIFormatter } from 'nightingale';
import { Platform } from 'react-native-web';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const getStackTrace = (e) => {
  if (Platform.hasOwnProperty("constants")) {
    if (Platform.constants.reactNativeVersion.minor >= 64) {
      return parseErrorStack(e.stack);
    } else return parseErrorStack(e);
  } else return parseErrorStack(e);
};
function parsedStackToString(stack) {
  return stack.map(
    (frame) => `  at ${frame.file ?? "unknown"}${frame.lineNumber ? `:${frame.lineNumber}${frame.column ? `:${frame.column}` : ""}` : ""}${frame.methodName ? ` in ${frame.methodName}` : ""}`
  ).join("\n");
}
function consoleOutput(param, record) {
  console.log(...param);
}
const createHandle = () => {
  return (record) => {
    const metadataError = record.metadata?.error;
    if (metadataError && metadataError instanceof Error) {
      symbolicateStackTrace(getStackTrace(metadataError)).then(({ stack, codeFrame }) => {
        metadataError.stack = parsedStackToString(stack);
        consoleOutput(ANSIFormatter.format(record));
      }).catch((error) => {
        metadataError.stack = void 0;
        consoleOutput(ANSIFormatter.format(record));
      });
    } else {
      consoleOutput(ANSIFormatter.format(record));
    }
  };
};
class ReactNativeConsoleHandler {
  constructor(minLevel) {
    this.minLevel = 0;
    this.minLevel = minLevel;
    this.isHandling = (level) => level >= minLevel;
    this.handle = createHandle();
  }
}

export { ReactNativeConsoleHandler };
//# sourceMappingURL=index-browser.es.js.map
