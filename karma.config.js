/* global process */
module.exports = function(config) {
  var configuration = {
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'mocha', 'chai', 'sinon-chai'],
    
    jspm: {
      loadFiles: ['test/**/*.spec.js'],
      // serveFiles makes additional files available for jspm to load,
      // but does not load immediately.
      serveFiles: ['compiled/**/*'],
      paths: {
        // Need to redirect a path such as 'common/route' to 'base/compiled/common/route'
        '*': 'base/compiled/*',
        // Tests aren't located under compiled directory. Undo the above path modification.
        'compiled/*': 'compiled/*',
        'test/*': 'test/*'
      }
    },
    
    // Karma serves all files under a /base/ directory.
    // This conflicts with any explicit 'root' paths in the application.
    // So, proxy all 'root' paths through '/base/' to ensure tests work properly.
    proxies: {
      '/': '/base/'
    },
    
    urlRoot: '/root/',
    
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
    browsers: ['Chrome', 'Firefox'],
    
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    
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