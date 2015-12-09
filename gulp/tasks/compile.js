const gulp = require('gulp');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const postcss = require('gulp-postcss');
const filter = require('gulp-filter');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const atImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const paths = require('../paths.js');

gulp.task('compile', ['compile-src', 'copy-jspmPackages', 'copy-jspm.config', 'copy-miscAssets']);

// Create a directory, /compiled, and copy all files from /src into it.
// Transpile ES6 to ES5 while copying and apply postCSS plugins against CSS.
// Use the /compiled directory instead of /src during development
// to avoid waiting for ES6 to transpile.
gulp.task('compile-src', () => {
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
    //.pipe(changed(paths.compiled))
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

gulp.task('copy-jspmPackages', () => {
  return gulp.src(paths.jspmPackages, { base: './' })
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(paths.compiled))
    .pipe(gulp.dest(paths.compiled));
});

gulp.task('copy-jspm.config', () => {
  return gulp.src('jspm.config.js')
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(paths.compiled))
    .pipe(gulp.dest(paths.compiled));
});

gulp.task('copy-miscAssets', () => {
  return gulp.src('src/*', { dot: true })
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(paths.compiled))
    .pipe(gulp.dest(paths.compiled));
});