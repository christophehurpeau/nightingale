var production = process.env.NODE_ENV === 'production';
var nodeVersion = process.versions.node.split('.');
var nodeVersionMajor = Number(nodeVersion[0]);
var nodeVersionMinor = Number(nodeVersion[1]);
/* istanbul ignore next */
if (nodeVersionMajor > 7 || (nodeVersionMajor === 7 && nodeVersionMinor >= 6))
  return module.exports = require('./lib-node7' + (production ? '' : '-dev') + '/index');
/* istanbul ignore next */
if (nodeVersionMajor > 6 || (nodeVersionMajor === 6 && nodeVersionMinor >= 5))
  return module.exports = require('./lib-node6' + (production ? '' : '-dev') + '/index');
/* istanbul ignore next */
return module.exports = require('./lib-older-node' + (production ? '' : '-dev') + '/index');
