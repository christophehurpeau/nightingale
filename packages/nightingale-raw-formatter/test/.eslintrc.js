exports.rules = {
  "import/no-extraneous-dependencies": [2, {"devDependencies": true}]
};

exports.globals = {
  suite: true,
  test: true,
  suiteSetup: true,
  suiteTeardown: true,
  setup: true,
  teardown: true,
};
