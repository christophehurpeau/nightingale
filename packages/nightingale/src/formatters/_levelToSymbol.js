import LogLevel from '../LogLevel';

const levelToSymbol = {};
levelToSymbol[LogLevel.TRACE] = '•';
levelToSymbol[LogLevel.DEBUG] = '•';
levelToSymbol[LogLevel.INFO] = '→';
levelToSymbol[LogLevel.WARN] = '⚠';
levelToSymbol[LogLevel.ERROR] = '✖';
levelToSymbol[LogLevel.CRITICAL] = '!';
levelToSymbol[LogLevel.FATAL] = '‼';
levelToSymbol[LogLevel.EMERGENCY] = '‼';

export default levelToSymbol;
