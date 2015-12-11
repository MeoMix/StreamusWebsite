var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var useref = require('gulp-useref');
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');
var util = require('gulp-util');
var del = require('del');
var packageConfig = require('../../package.json');
var paths = require('../paths.js');

// Create a bundled distribution from the compiled directory and put it into the dist directory.
// Ensure the dist directory is emptied before bundling to ensure no previous build artifacts remain.
// Ensure compiled files are up-to-date from the src directory before generating a build from them.
gulp.task('build', function(done) {
  runSequence(
    // Cleaning and compilation can run in parallel.
    ['build:cleanDist', 'compile'],
    // Compile html before js to ensure minified templates are inlined into js files.
    'build:transformHtml',
    'build:transformJs',
    // All other files can be copied in parallel
    ['build:copyImages', 'build:copyFonts', 'build:copyAssets'],
    'connect',
    done);
});

// Delete the contents of build location to ensure no build artifacts remain.
gulp.task('build:cleanDist', function() {
  return del(paths.dist);
});

// Move html from src to dest while transforming for production.
gulp.task('build:transformHtml', function() {
  return gulp.src(paths.compiledHtml)
    // Replace js references with a single reference to bundled js.
    .pipe(useref())
    .pipe(minifyHtml())
    .pipe(gulp.dest(paths.dist));
});

// Use jspm's builder to create a self-executing bundle of files.
// Written to a destination directory and ready for production use.
gulp.task('build:transformJs', function(done) {
  // By default, the config file can be found in the root directory. If defaults have been
  // changed then jspm's entry in packageConfig will know the correct value.
  const builder = new Builder(paths.compiled, packageConfig.jspm.configFile || 'config.js');
  const options = {
    runtime: false,
    // TODO: What are sourcemaps exactly?
    sourceMaps: false,
    minify: true
  };

  builder.buildStatic('main.js', paths.dist + 'main.js', options)
    .then(function() {
      util.log(util.colors.green('Built successfully to ' + paths.dist));
    })
    .catch(function(errorMessage) {
      util.log(util.colors.red(errorMessage));
    })
    .finally(done);
});

gulp.task('build:copyImages', function() {
  return gulp.src(paths.compiledImg)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build:copyFonts', function() {
  return gulp.src(paths.compiledFont)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build:copyAssets', function() {
  return gulp.src(paths.compiledAssets, { dot: true })
    .pipe(gulp.dest(paths.dist));
});