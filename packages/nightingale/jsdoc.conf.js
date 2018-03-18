const path = require('path');

module.exports = {
  opts: {
    template: path.dirname(require.resolve('minami')),
  },
  templates: {
    default: {
      includeDate: false,
    },
  },
};
