var gulp = require('gulp');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var postcss = require('gulp-postcss');
var filter = require('gulp-filter');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var atImport = require('postcss-import');
var cssnext = require('postcss-cssnext');
var paths = require('../paths.js');

/* eslint-disable max-len */
gulp.task('compile', ['compile:transformSrc', 'compile:copyJspmPackages', 'compile:copyJspmConfig', 'compile:copyAssets']);
/* eslint-enable max-len */

// Create a directory, /compiled, and copy all files from /src into it.
// Transpile ES6 to ES5 while copying and apply postCSS plugins against CSS.
// Use the /compiled directory instead of /src during development
// to avoid waiting for ES6 to transpile.
gulp.task('compile:transformSrc', function() {
  const jsFilter = filter(['**/*.js'], { restore: true });
  // Exclude common css as it will have been inlined into modules.
  const cssFilter = filter(['**/*.css', '!**/common/css/*.css'], { restore: true });
  const htmlFilter = filter(['**/*.+(html|hbs)'], { restore: true });
  const imgFilter = filter(['**/*.+(png|jpg|gif|svg)'], { restore: true });
  // TODO: Not dry with paths.
  const fontFilter = filter(['**/*.+(eot|ttf|woff|woff2|otf)']);

  const postCssPlugins = [
    // From postcss-import notes: This plugin should probably be used as the first plugin of your list.
    atImport({
      path: './src/'
    }),
    cssnext()
  ];

  return gulp.src(paths.srcFiles)
    .pipe(plumber())
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(paths.compiled))
    // Transpile ES6 files through babel and copy results to destination directory.
    .pipe(jsFilter)
    .pipe(babel({
      modules: 'system'
    }))
    .pipe(gulp.dest(paths.compiled))
    .pipe(jsFilter.restore)
    // Pipe css through postCSS and write result to destination.
    .pipe(cssFilter)
    .pipe(postcss(postCssPlugins))
    .pipe(gulp.dest(paths.compiled))
    .pipe(cssFilter.restore)
    // Copy .html and .hbs files to destination.
    .pipe(htmlFilter)
    .pipe(gulp.dest(paths.compiled))
    .pipe(htmlFilter.restore)
    // Copy .png, .jpg, .gif, and .svg files to destination.
    .pipe(imgFilter)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.compiled))
    .pipe(imgFilter.restore)
    // Copy .eot, .ttf, .woff, .woff2, and .otf files to destination.
    .pipe(fontFilter)
    .pipe(gulp.dest(paths.compiled));
});

gulp.task('compile:copyJspmPackages', function() {
  return gulp.src(paths.jspmPackages, { base: './' })
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(paths.compiled))
    .pipe(gulp.dest(paths.compiled));
});

gulp.task('compile:copyJspmConfig', function() {
  return gulp.src(paths.jspmConfig)
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(paths.compiled))
    .pipe(gulp.dest(paths.compiled));
});

gulp.task('compile:copyAssets', function() {
  return gulp.src(paths.srcAssets, { dot: true })
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(paths.compiled))
    .pipe(gulp.dest(paths.compiled));
});