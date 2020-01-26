const production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/index-node10' + (production ? '' : '-dev') + '.cjs');
