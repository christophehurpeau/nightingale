module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        frameworks: ['mocha', 'proclaim'],

        browsers: [
            'Firefox',
            'Chrome',
            'PhantomJS',
        ],

        files: [
            'http://cdn.polyfill.io/v1/polyfill.min.js?features=all',
            'mocha.conf.js',
            'dist/tests.js',
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        // enable / disable colors in the output (reporters and logs)
        colors: !process.env.DRONE,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR
        //  || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
    });
};
