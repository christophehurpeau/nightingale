const production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/configure-node10' + (production ? '' : '-dev') + '.cjs');
