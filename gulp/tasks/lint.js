var gulp = require('gulp');
var eslint = require('gulp-eslint');
var cached = require('gulp-cached');
var paths = require('../paths.js');

// Lint and enforce code quality style. Configuration found in .eslintrc files.
// http://eslint.org/
gulp.task('lint', function() {
  debugger;
  return gulp.src(paths.allJs)
    .pipe(cached('lint'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});