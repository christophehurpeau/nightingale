/* eslint-disable @typescript-eslint/no-unsafe-argument */

import formatterANSI from 'nightingale-ansi-formatter';
import type {
  Level,
  Handle,
  IsHandling,
  LogRecord,
  Metadata,
  Handler,
} from 'nightingale-types';
import { Platform } from 'react-native';
import type { StackFrame } from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const getStackTrace = (e: Error): any => {
  // eslint-disable-next-line no-prototype-builtins
  if (Platform.hasOwnProperty('constants')) {
    // RN version >= 0.63
    if (Platform.constants.reactNativeVersion.minor >= 64) {
      // RN version >= 0.64 -> Stacktrace as string
      return parseErrorStack(e.stack as unknown as any);
    }
    // RN version == 0.63 -> Stacktrace as string
    else return parseErrorStack(e);
  }
  // RN version < 0.63 -> Stacktrace as string
  else return parseErrorStack(e);
};

function parsedStackToString(stack: StackFrame[]): string {
  return stack
    .map(
      (frame) =>
        `  at ${frame.file}${
          frame.lineNumber
            ? `:${frame.lineNumber}${frame.column ? `:${frame.column}` : ''}`
            : ''
        }${frame.methodName ? ` in ${frame.methodName}` : ''}`,
    )
    .join('\n');
}

function consoleOutput<T extends Metadata>(
  param: string[] | string,
  record: LogRecord<T>,
): void {
  // eslint-disable-next-line no-console
  console.log(...param);
}

const createHandle = (): Handle => {
  return <T extends Metadata>(record: LogRecord<T>): void => {
    const metadataError = record.metadata?.error;
    if (metadataError && metadataError instanceof Error) {
      symbolicateStackTrace(getStackTrace(metadataError))
        .then(({ stack, codeFrame }: any) => {
          metadataError.stack = parsedStackToString(stack);
          consoleOutput([formatterANSI(record)], record);
        })
        .catch((error: unknown) => {
          metadataError.stack = undefined;
          consoleOutput([formatterANSI(record)], record);
        });
    } else {
      consoleOutput([formatterANSI(record)], record);
    }
  };
};

export class ReactNativeConsoleHandler implements Handler {
  minLevel: Level = 0;

  handle: Handle;

  isHandling: IsHandling;

  constructor(minLevel: Level) {
    this.minLevel = minLevel;
    this.isHandling = (level: Level) => level >= minLevel;
    this.handle = createHandle();
  }
}
