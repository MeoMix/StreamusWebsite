/* global process */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

// Determine all potential paths which need to be proxied by KarmaJS
// Replace requests to '/proxyTarget' with '/base/proxyTarget'
var proxyTargets = fs.readdirSync('compiled/').filter(function(file) {
  return fs.statSync(path.join('compiled/', file)).isDirectory();
});

var base = '/base/compiled';
var proxyValues = _.map(proxyTargets, function(proxyTarget) {
  return base + '/' + proxyTarget + '/';
});

var proxies = _.keyBy(proxyValues, function(proxyValue) {
  return proxyValue.replace(base, '');
});

module.exports = function(config) {
  var configuration = {
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'mocha', 'chai', 'sinon-chai'],
    
    jspm: {
      browser: 'jspm/jspm.browser.js',
      config: 'jspm/jspm.config.js',
      packages: 'jspm/jspm_packages/',
      loadFiles: ['test/**/*.spec.js'],
      // serveFiles makes additional files available for jspm to load,
      // but does not load immediately.
      serveFiles: ['compiled/**/*'],
      paths: {
        // Need to redirect a path such as 'common/route' to 'base/compiled/common/route'
        '*': 'base/compiled/*',
        // Tests aren't located under compiled directory. Undo the above path modification.
        'compiled/*': 'compiled/*',
        // TODO: .js file-ending necessary due to bug with karma-jspm: https://github.com/Workiva/karma-jspm/issues/141
        'test/*': 'test/*.js'
      }
    },
    
    // Karma serves all files under a /base/ directory.
    // This conflicts with the baseURL param provided through jspm's configuration file.
    // So, proxy requests to known paths through /base/ to keep everything working.
    // Don't proxy '/' because an infinite loop will occur when looking up non-trivial paths.
    proxies: _.defaults({
      '/compiled/': '/base/compiled/',
      '/test/': '/base/test/',
      '/jspm_packages/': '/base/jspm_packages/'
    }, proxies),
    
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

    browserNoActivityTimeout: 20000,
    
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