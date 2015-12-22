var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var useref = require('gulp-useref');
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');
var util = require('gulp-util');
var del = require('del');
var packageConfig = require('../../package.json');
var GlobFilter = require('../globFilter.js');

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
  return del(GlobFilter.DistFolder);
});

// Move html from src to dest while transforming for production.
gulp.task('build:transformHtml', function() {
  return gulp.src(GlobFilter.CompiledFolder + GlobFilter.AllHtml)
    // Replace js references with a single reference to bundled js.
    .pipe(useref())
    .pipe(minifyHtml())
    .pipe(gulp.dest(GlobFilter.DistFolder));
});

// Use jspm's builder to create a self-executing bundle of files.
// Written to a destination directory and ready for production use.
gulp.task('build:transformJs', function(done) {
  // By default, the config file can be found in the root directory. If defaults have been
  // changed then jspm's entry in packageConfig will know the correct value.
  const jspmConfigFile = packageConfig.jspm.configFile || GlobFilter.DefaultJspmConfigFile;
  const builder = new Builder(GlobFilter.CompiledFolder, jspmConfigFile);
  const options = {
    runtime: false,
    // TODO: What are sourcemaps exactly?
    sourceMaps: false,
    minify: true
  };

  builder.buildStatic('main.js', GlobFilter.DistFolder + 'main.js', options)
    .then(function() {
      util.log(util.colors.green('Built successfully to ' + GlobFilter.DistFolder));
    })
    .catch(function(errorMessage) {
      util.log(util.colors.red(errorMessage));
      // Exit the build task on build error so that local server isn't spawned.
      throw errorMessage;
    })
    .finally(done);
});

gulp.task('build:copyImages', function() {
  return gulp.src(GlobFilter.CompiledFolder + GlobFilter.AllImages)
    .pipe(gulp.dest(GlobFilter.DistFolder));
});

gulp.task('build:copyFonts', function() {
  return gulp.src(GlobFilter.CompiledFolder + GlobFilter.AllFonts)
    .pipe(gulp.dest(GlobFilter.DistFolder));
});

gulp.task('build:copyAssets', function() {
  return gulp.src(GlobFilter.CompiledFolder + GlobFilter.Assets, { dot: true })
    .pipe(gulp.dest(GlobFilter.DistFolder));
});