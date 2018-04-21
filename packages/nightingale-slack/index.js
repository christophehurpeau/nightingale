var production = process.env.NODE_ENV === 'production';
var nodeVersion = process.versions.node.split('.');
var nodeVersionMajor = Number(nodeVersion[0]);
var nodeVersionMinor = Number(nodeVersion[1]);
/* istanbul ignore next */
if (nodeVersionMajor > 10 || (nodeVersionMajor === 10))
  module.exports = require('./dist/index-node10' + (production ? '' : '-dev') + '.cjs');
/* istanbul ignore next */
else if (nodeVersionMajor > 8 || (nodeVersionMajor === 8 && nodeVersionMinor >= 3))
  module.exports = require('./dist/index-node8' + (production ? '' : '-dev') + '.cjs');
/* istanbul ignore next */
else
  module.exports = require('./dist/index-node6' + (production ? '' : '-dev') + '.cjs');
