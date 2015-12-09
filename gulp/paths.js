// Specify paths & globbing patterns for tasks.
// Don't make these relative (e.g. prefix with ./) otherwise gulp-watch
// will fail to detect added/deleted files.
module.exports = {
  'allJs': ['src/**/*.js', 'test/**/*.js', 'gulp/**/*.js', 'gulpfile.babel.js'],
  'src': 'src/',
  'srcFiles': 'src/**/*',
  'srcNonJs': ['src/**/*', '!src/**/*.js'],
  'compiled': 'compiled/',
  'compiledFiles': 'compiled/**/*',
  'compiledHtml': 'compiled/**/*.html',
  'compiledImg': 'compiled/**/*.+(png|jpg|gif|svg)',
  'compiledFont': 'compiled/**/*.+(eot|ttf|woff|woff2|otf)',
  'dist': 'dist/',
  'jspmPackages': 'jspm_packages/**/*'
};