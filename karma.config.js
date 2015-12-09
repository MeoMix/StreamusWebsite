module.exports = function(config) {
  var configuration = {
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'mocha', 'chai', 'sinon-chai'],

    jspm: {
      loadFiles: ['test/**/*.spec.js'],
      // serveFiles makes additional files available for jspm to load,
      // but does not load immediately.
      serveFiles: ['src/**/*'],
      paths: {
        // TODO: This needs to be more flexible.
        'application/*': 'base/src/application/*',
        'behavior/*': 'base/src/behavior/*',
        'button/*': 'base/src/button/*',
        'common/*': 'base/src/common/*',
        'content/*': 'base/src/content/*',
        'dialog/*': 'base/src/dialog/*',
        'footer/*': 'base/src/footer/*',
        'header/*': 'base/src/header/*',
        'playlist/*': 'base/src/playlist/*',
        'social/*': 'base/src/social/*'
      }
    },

    // Karma serves all files under a /base/ directory.
    // This conflicts with the baseURL param provided through jspm's configuration file.
    // So, proxy requests to known paths through /base/ to keep everything working.
    // Don't proxy '/' because an infinite loop will occur when looking up non-trivial paths.
    proxies: {
      '/src/': '/base/src/',
      '/test/': '/base/test/',
      '/jspm_packages/': '/base/jspm_packages/'
    },

    browserNoActivityTimeout: 200000,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  };

  // TravisCI does not have Google Chrome installed, but it does have Chromium installed.
  // Need to pass the --no-sandbox flag in to use as expected.
  // http://stackoverflow.com/a/25661593/633438
  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci', 'Firefox'];
  }

  config.set(configuration);
}
