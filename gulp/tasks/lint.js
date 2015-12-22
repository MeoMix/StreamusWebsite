var gulp = require('gulp');
var eslint = require('gulp-eslint');
var cached = require('gulp-cached');
var GlobFilter = require('../globFilter.js');

// Lint and enforce code quality style. Configuration found in .eslintrc files.
// http://eslint.org/
gulp.task('lint', function() {
  return gulp.src([
    GlobFilter.SrcFolder + GlobFilter.AllJs,
    GlobFilter.GulpFolder + GlobFilter.AllJs,
    GlobFilter.TestFolder + GlobFilter.AllJs
  ])
    .pipe(cached('lint'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});