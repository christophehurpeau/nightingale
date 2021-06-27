import Level from 'nightingale-levels';

export type LevelToSymbol = Readonly<Record<number, string>>;

export const levelToSymbol: LevelToSymbol = {
  [Level.TRACE]: '•',
  [Level.DEBUG]: '•',
  [Level.INFO]: '→',
  [Level.WARN]: '⚠',
  [Level.ERROR]: '✖',
  [Level.CRITICAL]: '!',
  [Level.FATAL]: '‼',
  [Level.EMERGENCY]: '‼',
};
