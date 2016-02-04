var gulp = require('gulp');
var path = require('path');
var util = require('gulp-util');
var connect = require('gulp-connect');
var del = require('del');
var Glob = require('../glob.js');
// https://github.com/gulpjs/gulp/blob/master/docs/API.md#eventtype
var WatchEventType = {
  Added: 'added',
  Changed: 'changed',
  Deleted: 'deleted'
};

// Watch source files for changes. Run compile task when changes detected.
gulp.task('watch', function(done) {
  var onFileChange = function(event) {
    // Write to log that change happened.
    util.log(
      util.colors.yellow(path.basename(event.path)) +
      util.colors.green(' was ' + event.type + ', recompiling...')
    );

    // Clean-up deleted files manually by finding and removing their counterpart.
    if (event.type === WatchEventType.Deleted) {
      var compiledPath = '';

      if (event.path.indexOf(Glob.Src) !== -1) {
        compiledPath = event.path.replace(Glob.Src, Glob.Compiled);
      } else if (event.path.indexOf(Glob.Jspm) !== -1) {
        // jspm's directory structure changes when moving into compiled.
        compiledPath = event.path.replace(Glob.Jspm, Glob.Compiled + '\\' + Glob.Jspm);
      } else {
        throw new Error('Unexpected path:' + event.path);
      }

      del(compiledPath);
    }
  };

  gulp.watch(Glob.SrcFolder + Glob.AllFiles, ['compile:transformSrc']).on('change', onFileChange);
  gulp.watch([
    Glob.JspmFolder + Glob.AllFiles,
    // It's too slow to watch jspm packages for changes. Increases watch task time by ~20s
    '!' + Glob.JspmFolder + Glob.JspmPackagesFolder + Glob.AllFiles
  ], ['compile:copyJspmFolder']).on('change', onFileChange);
  gulp.watch([
    Glob.CompiledFolder + Glob.AllFiles,
    // It's too slow to watch jspm packages for changes. Increases watch task time by ~20s
    '!' + Glob.CompiledFolder + Glob.JspmFolder + Glob.JspmPackagesFolder + Glob.AllFiles
  ]).on('change', function(event) {
    gulp.src(event.path)
      .pipe(connect.reload());
  });
  done();
});