import levels from 'nightingale-levels';

export interface LevelToStyles {
  readonly [level: number]: Array<string>;
}

const levelToStyles: LevelToStyles = {
  [levels.TRACE]: ['gray'],
  [levels.DEBUG]: ['gray'],
  // [levels.INFO]: ['gray'],
  [levels.WARN]: ['yellow'],
  [levels.ERROR]: ['red', 'bold'],
  [levels.CRITICAL]: ['red', 'bold'],
  [levels.FATAL]: ['bgRed', 'white'],
  [levels.EMERGENCY]: ['bgRed', 'white'],
};

export default levelToStyles;
