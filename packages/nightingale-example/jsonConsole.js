const production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/jsonConsole-node10' + (production ? '' : '-dev') + '.cjs');
