/* eslint-disable import/no-dynamic-require */

'use strict';

const production = process.env.NODE_ENV === 'production';
const nodeVersion = process.versions.node.split('.');
const nodeVersionMajor = Number(nodeVersion[0]);
const nodeVersionMinor = Number(nodeVersion[1]);
/* istanbul ignore next */
if (
  nodeVersionMajor > 12 ||
  (nodeVersionMajor === 12 && nodeVersionMinor >= 10)
) {
  module.exports = require(`./dist/errors-node12${
    production ? '' : '-dev'
  }.cjs.js`);
  /* istanbul ignore next */
} else {
  throw new Error(
    `Node version not supported: ${nodeVersion} (${process.versions.node}).`,
  );
}
