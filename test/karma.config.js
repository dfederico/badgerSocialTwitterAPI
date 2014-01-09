// Karma configuration
// Generated on Thu Aug 15 2013 16:10:49 GMT-0400 (EDT)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',


        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'src/**/*.js', included: false},
            {pattern: 'src/**/*.html', included: false},
            {pattern: 'src/**/*.css', included: false},
            {pattern: 'test/specs/**/*.js', included: false},
            {pattern: 'test/helpers/**/*.js', included: false},
            'test/main-test.js'
        ],

        // list of files to exclude
        exclude: [
            // 'src/main/resources/META-INF/web-resources/apps/mv/js/main.js'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['dots', 'coverage', 'junit'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            // 'src/main/resources/META-INF/web-resources/apps/mv/**/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type : 'lcov',
            dir : 'test/results/coverage/'
        },

        junitReporter: {
            outputFile: 'test/results/junit/test-results.xml',
            suite: ''
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'Chrome',
            'Firefox'
            // 'IE'
            // 'Safari'
            // 'PhantomJS'
        ],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 100000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
