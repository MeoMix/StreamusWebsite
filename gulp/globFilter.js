var packageConfig = require('../package.json');
var compiled = 'compiled';
var src = 'src';
var jspm = 'jspm';
var dist = 'dist';
var gulp = 'gulp';
var test = 'test';

// An enumeration of common, reusable glob filters.
// Mix these into minimatch expressions instead of using hardcoded strings.
module.exports = {
  AllFiles: '**/*',
  AllFonts: '**/*.+(eot|ttf|woff|woff2|otf)',
  AllImages: '**/*.+(png|jpg|gif|svg|bmp)',
  AllHtml: '**/*.html',
  AllTemplates: '**/*.hbs',
  AllCss: '**/*.css',
  AllJs: '**/*.js',
  Assets: '{.htaccess,favicon.ico,robots.txt,sitemap.xml}',
  CommonCss: '**/common/css/*.css',
  Src: src,
  SrcFolder: src + '/',
  Compiled: compiled,
  CompiledFolder: compiled + '/',
  Jspm: jspm,
  JspmFolder: jspm + '/',
  Dist: dist,
  DistFolder: dist + '/',
  Gulp: gulp,
  GulpFolder: gulp + '/',
  Test: test,
  TestFolder: test + '/',
  // By default, the config file can be found in the root directory. If defaults have been changed then jspm's
  // entry in packageConfig will know the correct value.
  JspmConfigFile: packageConfig.jspm.configFile || 'config.js'
};