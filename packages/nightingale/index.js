var production = process.env.NODE_ENV === 'production';
if (process.version.startsWith && process.version.startsWith('v6.'))
  module.exports = require('./lib-node6' + (production ? '' : '-dev') + '/');
else
  module.exports = require('./lib-older-node' + (production ? '' : '-dev') + '/');
