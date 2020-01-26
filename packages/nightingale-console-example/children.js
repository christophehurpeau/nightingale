const production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/children-node10' + (production ? '' : '-dev') + '.cjs');
