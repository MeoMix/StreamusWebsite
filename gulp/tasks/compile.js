var gulp = require('gulp');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var postcss = require('gulp-postcss');
var filter = require('gulp-filter');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var atImport = require('postcss-import');
var cssnext = require('postcss-cssnext');
var packageConfig = require('../../package.json');
var GlobFilter = require('../globFilter');

/* eslint-disable max-len */
gulp.task('compile', ['compile:transformSrc', 'compile:copyJspmPackages', 'compile:copyJspmConfig', 'compile:copyAssets']);
/* eslint-enable max-len */

// Create a directory, /compiled, and copy all files from /src into it.
// Transpile ES6 to ES5 while copying and apply postCSS plugins against CSS.
// Use the /compiled directory instead of /src during development
// to avoid waiting for ES6 to transpile.
gulp.task('compile:transformSrc', function() {
  const jsFilter = filter(GlobFilter.AllJs, { restore: true });
  // Exclude common css as it will have been inlined into modules.
  const cssFilter = filter([GlobFilter.AllCss, '!' + GlobFilter.CommonCss], { restore: true });
  const htmlAndTemplateFilter = filter([GlobFilter.AllHtml, GlobFilter.AllTemplates], { restore: true });
  const imgFilter = filter(GlobFilter.AllImages, { restore: true });
  const fontFilter = filter(GlobFilter.AllFonts);

  const postCssPlugins = [
    // From postcss-import notes: This plugin should probably be used as the first plugin of your list.
    atImport({
      path: './' + GlobFilter.SrcFolder
    }),
    cssnext()
  ];

  return gulp.src(GlobFilter.SrcFolder + GlobFilter.AllFiles)
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
    // Pipe css through postCSS and write result to destination.
    .pipe(cssFilter)
    .pipe(postcss(postCssPlugins))
    .pipe(gulp.dest(GlobFilter.CompiledFolder))
    .pipe(cssFilter.restore)
    // Copy .html and .hbs files to destination.
    .pipe(htmlAndTemplateFilter)
    .pipe(gulp.dest(GlobFilter.CompiledFolder))
    .pipe(htmlAndTemplateFilter.restore)
    // Copy .png, .jpg, .gif, and .svg files to destination.
    .pipe(imgFilter)
    .pipe(imagemin())
    .pipe(gulp.dest(GlobFilter.CompiledFolder))
    .pipe(imgFilter.restore)
    // Copy .eot, .ttf, .woff, .woff2, and .otf files to destination.
    .pipe(fontFilter)
    .pipe(gulp.dest(GlobFilter.CompiledFolder));
});

gulp.task('compile:copyJspmPackages', function() {
  return gulp.src(GlobFilter.AllJspmPackageFiles, { base: './' })
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(GlobFilter.CompiledFolder))
    .pipe(gulp.dest(GlobFilter.CompiledFolder));
});

gulp.task('compile:copyJspmConfig', function() {
  return gulp.src(packageConfig.jspm.configFile || GlobFilter.DefaultJspmConfigFile)
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(GlobFilter.CompiledFolder))
    .pipe(gulp.dest(GlobFilter.CompiledFolder));
});

gulp.task('compile:copyAssets', function() {
  return gulp.src(GlobFilter.SrcFolder + GlobFilter.Assets, { dot: true })
    // Don't waste time compiling files which have not changed.
    // Don't compare using sha1. Changed thinks all files changed when saving through Visual Studio.
    .pipe(changed(GlobFilter.CompiledFolder))
    .pipe(gulp.dest(GlobFilter.CompiledFolder));
});