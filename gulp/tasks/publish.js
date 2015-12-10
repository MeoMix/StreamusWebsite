const gulp = require('gulp');
const sftp = require('gulp-sftp');
const paths = require('../paths.js');

// TODO: This task doesn't work. It's throwing permission errors.
// Also, it would be good to implement a caching system for it.
gulp.task('publish', () => {
  return gulp.src('jspm.config.js')
    .pipe(sftp({
      host: 's01.lumoushosting.com',
      port: 2232,
      auth: 'keyMain',
      dest: '/home/stream12/public_html/test'
    }));
});