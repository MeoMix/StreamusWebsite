// Specify paths & globbing patterns for tasks.
// Don't make these relative (e.g. prefix with ./) otherwise gulp-watch
// will fail to detect added/deleted files.
module.exports = {
  allJs: ['src/**/*.js', 'test/**/*.js', 'gulp/**/*.js', 'gulpfile.babel.js'],
  srcFiles: 'src/**/*',
  compiled: 'compiled/',
  compiledFiles: 'compiled/**/*',
  compiledHtml: 'compiled/**/*.html',
  compiledImg: 'compiled/**/*.+(png|jpg|gif|svg)',
  compiledFont: 'compiled/**/*.+(eot|ttf|woff|woff2|otf)',
  // .htaccess, favicon.ico, robots.txt, sitemap.xml, etc.
  compiledAssets: ['compiled/*.*', '!compiled/index.html', '!compiled/main.js'],
  srcAssets: ['src/*.*', '!src/index.html', '!src/main.js'],
  dist: 'dist/',
  jspmPackages: 'jspm_packages/**/*.+(js|css)',
  jspmConfig: 'jspm.config.js'
};