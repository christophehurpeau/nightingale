import levels from 'nightingale-levels';

export default {
  [levels.TRACE]: ['gray'],
  [levels.DEBUG]: ['gray'],
  // [levels.INFO]: ['gray'],
  [levels.WARN]: ['yellow'],
  [levels.ERROR]: ['red', 'bold'],
  [levels.CRITICAL]: ['red', 'bold'],
  [levels.FATAL]: ['bgRed', 'white'],
  [levels.EMERGENCY]: ['bgRed', 'white'],
};
