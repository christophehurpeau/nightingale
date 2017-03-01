var production = process.env.NODE_ENV === 'production';
/* istanbul ignore next */
if (process.version.startsWith && process.version.startsWith('v7.'))
  return module.exports = require('./lib-node7' + (production ? '' : '-dev') + '/createBody');
/* istanbul ignore next */
if (process.version.startsWith && process.version.startsWith('v6.'))
  return module.exports = require('./lib-node6' + (production ? '' : '-dev') + '/createBody');
/* istanbul ignore next */
throw new Error('Platform not supported: ' + process.version + '.');
