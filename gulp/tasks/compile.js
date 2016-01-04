var gulp = require('gulp');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var filter = require('gulp-filter');
var plumber = require('gulp-plumber');
var GlobFilter = require('../globFilter');

gulp.task('compile', ['compile:transformSrc', 'compile:copyJspmFolder']);

// Create a directory, /compiled, and copy all files from /src into it.
// Transpile ES6 to ES5 while copying and apply postCSS plugins against CSS.
// Use the /compiled directory instead of /src during development
// to avoid waiting for ES6 to transpile.
gulp.task('compile:transformSrc', function() {
  var jsFilter = filter(GlobFilter.AllJs, { restore: true });

  return gulp.src(GlobFilter.SrcFolder + GlobFilter.AllFiles, { dot: true })
    .pipe(plumber())
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(GlobFilter.CompiledFolder))
    // Transpile ES6 files through babel and copy results to destination directory.
    .pipe(jsFilter)
    .pipe(babel({
      modules: 'system'
    }))
    .pipe(gulp.dest(GlobFilter.CompiledFolder))
    .pipe(jsFilter.restore)
    .pipe(filter([GlobFilter.AllCss, GlobFilter.AllHtml, GlobFilter.AllTemplates, GlobFilter.AllImages, GlobFilter.AllFonts, GlobFilter.Assets]))
    .pipe(gulp.dest(GlobFilter.CompiledFolder));
});

gulp.task('compile:copyJspmFolder', function() {
  // Set base to preserve the /jspm directory.
  return gulp.src(GlobFilter.JspmFolder + GlobFilter.AllFiles, { base: './'})
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(GlobFilter.CompiledFolder))
    .pipe(gulp.dest(GlobFilter.CompiledFolder));
});