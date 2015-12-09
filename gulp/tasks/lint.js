const gulp = require('gulp');
const eslint = require('gulp-eslint');
const cached = require('gulp-cached');
const paths = require('../paths.js');

// Lint and enforce code quality style. Configuration found in .jscsrc files.
// http://jscs.info/
gulp.task('lint', () => {
  return gulp.src(paths.allJs)
    .pipe(cached('lint'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});