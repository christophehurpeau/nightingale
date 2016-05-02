/* eslint camelcase:"off" */
import AbstractHandler from 'nightingale-handler';
import levelNames from 'nightingale-level-names';

/**
 * @param {int} minLevel
 */
export default class WinstonAdapterHandler extends AbstractHandler {
    constructor(winstonTransport, minLevel) {
        super(minLevel);
        this.winstonTransport = winstonTransport;
    }

    handle(record) {
        return new Promise((resolve, reject) => {
            this.winstonTransport.log(record.level, record.message, {
                level_name: levelNames.get(record.level),
                key: record.key,
                metadata: record.metadata,
                extra: record.extra,
            }, (err) => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        });
    }
}
