import type { Level } from 'nightingale-levels';

export { Level } from 'nightingale-levels';

export type Styles = string[] | undefined;

export interface Metadata {
  context?: Record<string, unknown>;
  [propName: string]: unknown;
}

export type MetadataStyles<T extends Metadata> = { [P in keyof T]?: Styles };

export interface LogRecord<T extends Metadata> {
  level: Level;
  key: string;
  displayName?: string;
  datetime: Date;
  message: string;
  context?: Record<string, unknown>;
  metadata?: T;
  extra?: Record<string, unknown>;
  symbol?: string;
  styles?: Styles;
  metadataStyles?: MetadataStyles<T>;
}

export type IsHandling = (level: Level, key: string) => boolean;
export type Handle = <T extends Metadata>(
  record: Readonly<LogRecord<T>>,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => false | void;

export interface Handler {
  minLevel: Level;
  isHandling?: IsHandling;
  handle: Handle;
}

export type Processor = <T extends Metadata>(
  record: Readonly<LogRecord<T>>,
  context?: Record<string, unknown>,
) => void;
