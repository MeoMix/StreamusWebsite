var gulp = require('gulp');
var path = require('path');
var Server = require('karma').Server;

// Start a Karma server and execute test suites. Configuraiton bound in karma.conf.js
// http://karma-runner.github.io/
gulp.task('test', function(done) {
  const server = new Server({
    configFile: path.resolve('karma.config.js'),
    // Don't run in continuous integration mode.
    // Just execute tests once and exit.
    singleRun: true
  }, done);

  server.start();
});