const production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/console-node10' + (production ? '' : '-dev') + '.cjs');
