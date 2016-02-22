var gulp = require('gulp');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var filter = require('gulp-filter');
var plumber = require('gulp-plumber');
var Glob = require('../glob');

gulp.task('compile', ['compile:transformSrc', 'compile:copyJspmFolder']);

// Create a directory, /compiled, and copy all files from /src into it.
// Transpile ES6 to ES5 while copying and apply postCSS plugins against CSS.
// Use the /compiled directory instead of /src during development
// to avoid waiting for ES6 to transpile.
gulp.task('compile:transformSrc', function() {
  var jsFilter = filter(Glob.AllJs, { restore: true });

  return gulp.src(Glob.SrcFolder + Glob.AllFiles, { dot: true })
    .pipe(plumber())
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(Glob.CompiledFolder))
    // Transpile ES6 files through babel and copy results to destination directory.
    .pipe(jsFilter)
    .pipe(babel({
      presets: ['es2015'],
      // Don't transpile into global scope. Functionality will break (e.g. Marionette.Object)
      plugins: ['transform-es2015-modules-systemjs']
    }))
    .pipe(gulp.dest(Glob.CompiledFolder))
    .pipe(jsFilter.restore)
    .pipe(filter([
      Glob.AllCss,
      Glob.AllHtml,
      Glob.AllTemplates,
      Glob.AllImages,
      Glob.AllFonts,
      Glob.Assets
    ]))
    .pipe(gulp.dest(Glob.CompiledFolder));
});

gulp.task('compile:copyJspmFolder', function() {
  // Set base to preserve the /jspm directory.
  return gulp.src(Glob.JspmFolder + Glob.AllFiles, { base: './', dot: true })
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(Glob.CompiledFolder))
    .pipe(gulp.dest(Glob.CompiledFolder));
});