var gulp = require('gulp');
var connect = require('gulp-connect');
var pushState = require('connect-pushstate');
var cached = require('gulp-cached');
var opn = require('opn');
var path = require('path');
var argv = require('yargs').argv;
var paths = require('../paths.js');

// Create a local server for hosting the project.
// Responds to livereload commands so file changes don't require refreshing.
gulp.task('connect', function(done) {
  var host = 'localhost';
  var port = 8080;
  // Open default browser to the compiled or dist directory depending on build status.
  var directoryName = argv._[0] === 'build' ? 'dist' : 'compiled';

  connect.server({
    host: host,
    port: port,
    // Needs to be path.resolve and not just './'
    // https://github.com/AveVlad/gulp-connect/issues/54
    root: path.resolve('./' + directoryName),
    livereload: true,
    middleware: function() {
      return [pushState()];
    }
  });

  opn('http://' + host + ':' + port + '/');
  done();
});

// Notify the connect server that it should reload files
// from the compiled directory which have changed since last reload.
gulp.task('connect:reloadCompiledFiles', function() {
  gulp.src(paths.compiledFiles)
    .pipe(cached('connect:reloadCompiledFiles'))
    .pipe(connect.reload());
});