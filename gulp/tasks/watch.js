const gulp = require('gulp');
const path = require('path');
const util = require('gulp-util');
const del = require('del');
const paths = require('../paths.js');
// https://github.com/gulpjs/gulp/blob/master/docs/API.md#eventtype
const WatchEventType = {
  Added: 'added',
  Changed: 'changed',
  Deleted: 'deleted'
};

// Watch source files for changes. Run compile task when changes detected.
gulp.task('watch', (done) => {
  const logChanges = (event) => {
    util.log(
      util.colors.yellow(`${path.basename(event.path)}`) +
      util.colors.green(` was ${event.type}, recompiling...`)
    );
  };

  // TODO: Probably should watch for other assets being added/removed from root.
  gulp.watch(paths.srcFiles, ['compile']).on('change', logChanges);
  gulp.watch(paths.jspmConfig, ['compile:copyJspmConfig']).on('change', logChanges);
  gulp.watch(paths.jspmPackagesJs, ['compile:copyJspmPackagesJs']).on('change', logChanges);
  // TODO: What if jspmConfig or jspmPackagesJs or assets are deleted?
  gulp.watch(paths.srcFiles, (event) => {
    if (event.type === WatchEventType.Deleted) {
      del(event.path.replace('src/', 'compiled/'));
    }
  });
  gulp.watch(paths.compiledFiles, ['connect:reloadCompiledFiles']).on('change', logChanges);
  done();
});