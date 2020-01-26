'use strict';

/*
 * husky greps this file to check if a hook is defined
 * so we need to list them here:
 * - commit-msg
 * - pre-commit
 * - post-checkout
 * - post-merge
 * - post-rewrite
 * - pre-push
 */

const createHuskyConfig = require('@pob/repo-config/createHuskyConfig');

module.exports = createHuskyConfig();
