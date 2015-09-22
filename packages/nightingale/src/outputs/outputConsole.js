import LogLevel from '../LogLevel';

export function write(string, logLevel) {
    let outKey = logLevel >= LogLevel.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(string);
}
