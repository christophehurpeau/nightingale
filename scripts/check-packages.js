'use strict';

const {
  createCheckPackageWithWorkspaces,
} = require('check-package-dependencies');

createCheckPackageWithWorkspaces().checkRecommended({
  isLibrary: () => true,
});
