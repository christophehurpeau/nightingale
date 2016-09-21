var production = process.env.NODE_ENV === 'production';
if (process.version.startsWith && process.version.startsWith('v6.'))
    return module.exports = require('./lib-node6' + (production ? '' : '-dev') + '/');
return module.exports = require('./lib-older-node' + (production ? '' : '-dev') + '/');
