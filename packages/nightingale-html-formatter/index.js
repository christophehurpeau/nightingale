var production = process.env.NODE_ENV === 'production';
module.exports = require('./lib-node6' + (production ? '' : '-dev') + '/');
