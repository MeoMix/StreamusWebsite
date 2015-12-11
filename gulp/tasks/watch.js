var gulp = require('gulp');
var path = require('path');
var util = require('gulp-util');
var del = require('del');
var paths = require('../paths.js');
// https://github.com/gulpjs/gulp/blob/master/docs/API.md#eventtype
var WatchEventType = {
  Added: 'added',
  Changed: 'changed',
  Deleted: 'deleted'
};

// Watch source files for changes. Run compile task when changes detected.
gulp.task('watch', function(done) {
  var logChanges = function(event) {
    util.log(
      util.colors.yellow(path.basename(event.path)) +
      util.colors.green(' was ' + event.type + ', recompiling...')
    );
  };

  // TODO: Probably should watch for other assets being added/removed from root.
  gulp.watch(paths.srcFiles, ['compile']).on('change', logChanges);
  gulp.watch(paths.jspmConfig, ['compile:copyJspmConfig']).on('change', logChanges);
  gulp.watch(paths.jspmPackagesJs, ['compile:copyJspmPackagesJs']).on('change', logChanges);
  // TODO: What if jspmConfig or jspmPackagesJs or assets are deleted?
  gulp.watch(paths.srcFiles, function(event) {
    if (event.type === WatchEventType.Deleted) {
      del(event.path.replace('src/', 'compiled/'));
    }
  });
  gulp.watch(paths.compiledFiles, ['connect:reloadCompiledFiles']).on('change', logChanges);
  done();
});