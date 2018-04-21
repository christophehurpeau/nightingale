import Level from 'nightingale-levels';

export interface LevelToSymbol {
  readonly [level: number]: string;
}

const levelToSymbol: LevelToSymbol = {
  [Level.TRACE]: '•',
  [Level.DEBUG]: '•',
  [Level.INFO]: '→',
  [Level.WARN]: '⚠',
  [Level.ERROR]: '✖',
  [Level.CRITICAL]: '!',
  [Level.FATAL]: '‼',
  [Level.EMERGENCY]: '‼',
};

export default levelToSymbol;
