var production = process.env.NODE_ENV === 'production';
/* istanbul ignore next */
if (process.version.startsWith && process.version.startsWith('v7.'))
  return module.exports = require('./lib-node7' + (production ? '' : '-dev') + '/index');
/* istanbul ignore next */
if (process.version.startsWith && process.version.startsWith('v6.'))
  return module.exports = require('./lib-node6' + (production ? '' : '-dev') + '/index');
return module.exports = require('./lib-older-node' + (production ? '' : '-dev') + '/index');
