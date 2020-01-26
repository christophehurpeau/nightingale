const production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/debug-node10' + (production ? '' : '-dev') + '.cjs');
