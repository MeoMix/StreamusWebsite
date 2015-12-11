var gulp = require('gulp');
var runSequence = require('run-sequence');

// Compile src files, start a local server to host the compiled files, and
// watch src files for changes so server can reload newly compiled files.
gulp.task('default', function(done) {
  // Use runSequence to prevent 'watch' from triggering on 'compile'
  runSequence('compile', 'connect', 'watch', done);
});