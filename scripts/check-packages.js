import { createCheckPackageWithWorkspaces } from 'check-package-dependencies';

createCheckPackageWithWorkspaces().checkRecommended({
  isLibrary: () => true,
});
