const gulp = require('gulp');
const connect = require('gulp-connect');
const pushState = require('connect-pushstate');
const cached = require('gulp-cached');
const opn = require('opn');
const path = require('path');
const argv = require('yargs').argv;
const paths = require('../paths.js');

// Create a local server for hosting the project.
// Responds to livereload commands so file changes don't require refreshing.
gulp.task('connect', (done) => {
  const host = 'localhost';
  const port = 8080;

  // Open default browser to the compiled or dist directory depending on build status.
  const directoryName = argv._[0] === 'build' ? 'dist' : 'compiled';

  connect.server({
    host,
    port,
    // Needs to be path.resolve and not just './'
    // https://github.com/AveVlad/gulp-connect/issues/54
    root: path.resolve(`./${directoryName}`),
    livereload: true,
    middleware: () => {
      return [pushState()];
    }
  });

  opn(`http://${host}:${port}/`);
  done();
});

// Notify the connect server that it should reload files
// from the compiled directory which have changed since last reload.
gulp.task('connect-reloadCompiledFiles', () => {
  gulp.src(paths.compiledFiles)
    .pipe(cached('connect-reloadCompiledFiles'))
    .pipe(connect.reload());
});