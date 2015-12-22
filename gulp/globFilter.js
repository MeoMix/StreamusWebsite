// An enumeration of common, reusable glob filters.
// Mix these into minimatch expressions instead of using hardcoded strings.
module.exports = {
  AllFiles: '**/*',
  AllFilesFlat: '*.*',
  AllFonts: '**/*.+(eot|ttf|woff|woff2|otf)',
  AllImages: '**/*.+(png|jpg|gif|svg|bmp)',
  AllHtml: '**/*.html',
  AllTemplates: '**/*.hbs',
  AllCss: '**/*.css',
  AllJs: '**/*.js',
  AllJspmPackageFiles: 'jspm_packages/**/*.+(js|css)',
  Assets: '{.htaccess,favicon.ico,robots.txt,sitemap.xml}',
  CommonCss: '**/common/css/*.css',
  CompiledFolder: 'compiled/',
  DistFolder: 'dist/',
  SrcFolder: 'src/',
  GulpFolder: 'gulp/',
  TestFolder: 'test/',
  DefaultJspmConfigFile: 'config.js'
};