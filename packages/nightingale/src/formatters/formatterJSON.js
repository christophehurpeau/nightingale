export function style(styles, string) {
    return string;
}

/**
 * @param {Object} record
 * @returns {Object}
 */
export function format(record) {
    return {
        level: record.level,
        datetime: record.datetime,
        message: record.message,
        extra: record.extra,
        context: record.context,
    };
}
