import LogLevel from './LogLevel';

const levels = Object.keys(LogLevel).map((key) => {
    return {
        key: key,
        lcKey: key.toLowerCase(),
        value: LogLevel[key],
    };
});

export default levels;
