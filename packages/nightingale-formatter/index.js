var production = process.env.NODE_ENV === 'production';
var nodeVersion = parseFloat(process.versions.node);
/* istanbul ignore next */
if (nodeVersion >= 7.6)
  return module.exports = require('./lib-node7' + (production ? '' : '-dev') + '/index');
/* istanbul ignore next */
if (nodeVersion >= 6.5)
  return module.exports = require('./lib-node6' + (production ? '' : '-dev') + '/index');
/* istanbul ignore next */
return module.exports = require('./lib-older-node' + (production ? '' : '-dev') + '/index');
