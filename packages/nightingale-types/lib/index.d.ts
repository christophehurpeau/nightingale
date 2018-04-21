import Level = require('nightingale-levels');

export { Level };

export type Styles = Array<string> | undefined;

export interface Metadata {
  [propName: string]: any;
}

export type MetadataStyles<T extends Metadata> = { [P in keyof T]: any };

export interface Record<T extends Metadata> {
  level: Level;
  key: string;
  displayName?: string;
  datetime: Date;
  message: string;
  context?: object;
  metadata?: T;
  extra?: object | any;
  symbol?: string;
  styles?: Styles;
  metadataStyles?: MetadataStyles<T>;
}

export type IsHandling = (level: Level, key: string) => boolean;
export type Handle = <T extends Metadata>(record: Readonly<Record<T>>) => false | void;

export interface Handler {
  minLevel: number;
  isHandling?: IsHandling;
  handle: Handle;
}

export type Processor = <T extends Metadata>(record: Readonly<Record<T>>, context?: object) => void;
