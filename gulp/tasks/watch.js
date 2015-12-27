var gulp = require('gulp');
var path = require('path');
var util = require('gulp-util');
var del = require('del');
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

  //gulp.watch(GlobFilter.SrcFolder + GlobFilter.AllFiles, ['compile:transformSrc']).on('change', logChanges);
  //gulp.watch(GlobFilter.JspmFolder + GlobFilter.AllFiles, ['compile:copyJspmFolder']).on('change', logChanges);
  
  //// Clean-up deleted files manually by finding and removing their counterpart.
  //gulp.watch([GlobFilter.SrcFolder + GlobFilter.AllFiles, GlobFilter.JspmFolder + GlobFilter.AllFiles], function(event) {
  //  if (event.type === WatchEventType.Deleted) {
  //    var regexp = new RegExp(GlobFilter.Src + '|' + GlobFilter.Jspm);
  //    var compiledPath = event.path.replace(regexp, GlobFilter.Compiled);
  //    del(compiledPath);
  //  }
  //});

  //gulp.watch(GlobFilter.CompiledFolder + GlobFilter.AllFiles, ['connect:reloadCompiledFiles']).on('change', logChanges);
  done();
});