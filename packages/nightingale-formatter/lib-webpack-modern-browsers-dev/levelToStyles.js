import levels from 'nightingale-levels';

var levelToStyles = {
    [levels.TRACE]: ['gray'],
    [levels.DEBUG]: ['gray'],
    // [levels.INFO]: ['gray'],
    [levels.WARN]: ['yellow'],
    [levels.ERROR]: ['red', 'bold'],
    [levels.CRITICAL]: ['red', 'bold'],
    [levels.FATAL]: ['bgRed', 'white'],
    [levels.EMERGENCY]: ['bgRed', 'white']
};

export default levelToStyles;
//# sourceMappingURL=levelToStyles.js.map