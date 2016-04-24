import levels from 'nightingale-levels';

const levelToStyles = {};
levelToStyles[levels.TRACE] = ['gray'];
levelToStyles[levels.DEBUG] = ['gray'];
// levelToStyles[levels.INFO] = ['gray'];
levelToStyles[levels.WARN] = ['orange'];
levelToStyles[levels.ERROR] = ['red', 'bold'];
levelToStyles[levels.CRITICAL] = ['red', 'bold'];
levelToStyles[levels.FATAL] = ['bgRed', 'white'];
levelToStyles[levels.EMERGENCY] = ['bgRed', 'white'];

export default levelToStyles;
