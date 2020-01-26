const production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/errors-node10' + (production ? '' : '-dev') + '.cjs');
