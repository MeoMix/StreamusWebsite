var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');
var runSequence = require('run-sequence');
var jspm = require('jspm');
var util = require('gulp-util');
var del = require('del');
var imagemin = require('gulp-imagemin');
var Glob = require('../glob.js');

// Create a bundled distribution from the compiled directory and put it into the dist directory.
// Ensure the dist directory is emptied before bundling to ensure no previous build artifacts remain.
// Ensure compiled files are up-to-date from the src directory before generating a build from them.
gulp.task('build', function(done) {
  runSequence(
    // Cleaning and compilation can run in parallel.
    ['build:cleanDist', 'compile'],
    // NOTE: Minification of hbs not currently supported.
    // https://github.com/MeoMix/jspm-marionette-boilerplate/issues/14
    // Compile html before js to ensure minified templates are inlined into js files.
    'build:transformHtml',
    'build:transformJs',
    // All other files can be copied in parallel
    ['build:minifyImages', 'build:copyFonts', 'build:copyAssets'],
    'connect',
    done);
});

// Delete the contents of build location to ensure no build artifacts remain.
gulp.task('build:cleanDist', function() {
  return del(Glob.DistFolder);
});

// Move html from src to dest while transforming for production.
gulp.task('build:transformHtml', function() {
  return gulp.src([
    Glob.CompiledFolder + Glob.AllHtml,
    '!' + Glob.CompiledFolder + Glob.JspmFolder + Glob.AllHtml
  ])
    // Replace js references with a single reference to bundled js.
    .pipe(useref({
      // htmlmin will throw an error if assets are piped to it.
      noAssets: true
    }))
    // Options for htmlmin found here: https://github.com/kangax/html-minifier#options-quick-reference
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(Glob.DistFolder));
});

// Use jspm's builder to create a self-executing bundle of files.
// Written to a destination directory and ready for production use.
gulp.task('build:transformJs', function(done) {
  // More information on using SystemJS builder here: https://github.com/systemjs/builder
  const builder = new jspm.Builder(Glob.CompiledFolder);

  const options = {
    // Don't include runtime because any dependencies on System are incorrect.
    // A properly built distribution should not need to run System at runtime.
    runtime: true,
    sourceMaps: true,
    // Note: Default is minify: true, but often want to toggle it off for debugging. So, I've mentioned the option here.
    minify: false,
    production: true,
    browser: true
  };

  builder.buildStatic('main.js', Glob.DistFolder + 'main.js', options)
    .then(function() {
      util.log(util.colors.green('Built successfully to ' + Glob.DistFolder));
    })
    .catch(function(errorMessage) {
      util.log(util.colors.red(errorMessage));
      // Exit the build task on build error so that local server isn't spawned.
      throw errorMessage;
    })
    .finally(done);
});

gulp.task('build:minifyImages', function() {
  return gulp.src([
    Glob.CompiledFolder + Glob.AllImages,
    '!' + Glob.CompiledFolder + Glob.JspmFolder + Glob.AllImages
  ])
    .pipe(imagemin())
    .pipe(gulp.dest(Glob.DistFolder));
});

gulp.task('build:copyFonts', function() {
  return gulp.src([
    Glob.CompiledFolder + Glob.AllFonts,
    '!' + Glob.CompiledFolder + Glob.JspmFolder + Glob.AllFonts
  ])
    .pipe(gulp.dest(Glob.DistFolder));
});

gulp.task('build:copyAssets', function() {
  return gulp.src(Glob.CompiledFolder + Glob.Assets, { dot: true })
    .pipe(gulp.dest(Glob.DistFolder));
});