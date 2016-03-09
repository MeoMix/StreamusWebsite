var gulp = require('gulp');
var path = require('path');
var Server = require('karma').Server;
var runSequence = require('run-sequence');

// Start a Karma server and execute test suites. Configuration bound in karma.conf.js
// http://karma-runner.github.io/
gulp.task('test', function(done) {
  runSequence('compile', 'test:startKarmaServer', done);
});

gulp.task('test:startKarmaServer', function(done) {
  const server = new Server({
    configFile: path.resolve('karma.config.js')
  }, done);

  server.start();
});