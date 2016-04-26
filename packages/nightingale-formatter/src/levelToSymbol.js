import levels from 'nightingale-levels';

const levelToSymbol = {};
levelToSymbol[levels.TRACE] = '•';
levelToSymbol[levels.DEBUG] = '•';
levelToSymbol[levels.INFO] = '→';
levelToSymbol[levels.WARN] = '⚠';
levelToSymbol[levels.ERROR] = '✖';
levelToSymbol[levels.CRITICAL] = '!';
levelToSymbol[levels.FATAL] = '‼';
levelToSymbol[levels.EMERGENCY] = '‼';

export default levelToSymbol;
