const production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/createBody-node10' + (production ? '' : '-dev') + '.cjs');
