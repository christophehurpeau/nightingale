/* eslint-disable import/no-dynamic-require */

'use strict';

const production = process.env.NODE_ENV === 'production';
module.exports = require(`./dist/sentry-node12${production ? '' : '-dev'}.cjs`);
