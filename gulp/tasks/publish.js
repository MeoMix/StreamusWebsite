var gulp = require('gulp');
var sftp = require('gulp-sftp');
var paths = require('../paths.js');

// TODO: This task doesn't work. It's throwing permission errors.
// Also, it would be good to implement a caching system for it.
gulp.task('publish', function() {
  return gulp.src('jspm.config.js')
    .pipe(sftp({
      host: 's01.lumoushosting.com',
      port: 2232,
      auth: 'keyMain',
      dest: '/home/stream12/public_html/test'
    }));
});