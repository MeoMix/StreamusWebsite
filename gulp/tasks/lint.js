var gulp = require('gulp');
var eslint = require('gulp-eslint');
var cached = require('gulp-cached');
var Glob = require('../glob.js');

// Lint and enforce code quality style. Configuration found in .eslintrc files.
// http://eslint.org/
gulp.task('lint', function() {
  return gulp.src([
    Glob.SrcFolder + Glob.AllJs,
    Glob.GulpFolder + Glob.AllJs,
    Glob.TestFolder + Glob.AllJs
  ])
    .pipe(cached('lint'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});