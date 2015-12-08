import LogLevel from '../LogLevel';

const levelToStyles = {};
levelToStyles[LogLevel.TRACE] = ['gray'];
levelToStyles[LogLevel.DEBUG] = ['gray'];
// levelToStyles[LogLevel.INFO] = ['gray'];
levelToStyles[LogLevel.WARN] = ['yellow'];
levelToStyles[LogLevel.ERROR] = ['red', 'bold'];
levelToStyles[LogLevel.CRITICAL] = ['red', 'bold'];
levelToStyles[LogLevel.FATAL] = ['bgRed', 'white'];
levelToStyles[LogLevel.EMERGENCY] = ['bgRed', 'white'];

export default levelToStyles;
