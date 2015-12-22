var gulp = require('gulp');
var path = require('path');
var util = require('gulp-util');
var del = require('del');
var packageConfig = require('../../package.json');
var GlobFilter = require('../globFilter.js');
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
  gulp.watch(GlobFilter.SrcFolder + GlobFilter.AllFiles, ['compile']).on('change', logChanges);
  const jspmConfigFile = packageConfig.jspm.configFile || GlobFilter.DefaultJspmConfigFile;
  gulp.watch(jspmConfigFile, ['compile:copyJspmConfig']).on('change', logChanges);
  gulp.watch(GlobFilter.AllJspmPackageFiles, ['compile:copyJspmPackages']).on('change', logChanges);
  // TODO: What if jspmConfig or jspmPackagesJs or assets are deleted?
  gulp.watch(GlobFilter.SrcFolder + GlobFilter.AllFiles, function(event) {
    if (event.type === WatchEventType.Deleted) {
      del(event.path.replace(GlobFilter.SrcFolder, GlobFilter.CompiledFolder));
    }
  });
  gulp.watch(GlobFilter.CompiledFolder + GlobFilter.AllFiles, ['connect:reloadCompiledFiles']).on('change', logChanges);
  done();
});