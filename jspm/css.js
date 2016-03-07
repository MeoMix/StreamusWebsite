import Plugins from 'jspm-loader-css/src/plugins.js'
import Loader from 'jspm-loader-css/src/loader.js'
import path from 'path';
import url from 'postcss-url';
import mixins from 'postcss-mixins';
import nesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';
import mixinFrom from 'postcss-mixin-from';
import inlineTrait from 'postcss-inline-trait';
import atImport from 'postcss-import';

const isBundling = typeof window === 'undefined';
const traitPath = 'common/css/traits/';

// Support referencing CSS files found in traits folder without providing full path.
// 
// Original:
// .foo { composes: trait from 'trait-file' }
// 
// Result:
// .foo { composes: trait from 'common/css/traits/trait-file.css' }
const composesHelper = (css) => {
  css.walkRules((rule) => {
    rule.walkDecls('composes', (decl) => {
      decl.value = decl.value.replace(/'(.*)'$/, `'${traitPath}$1.css'`);
    });
  });
};

// TODO: This still feels overly messy to me. I feel like this work should be handled by normalize if I could only express it correctly.
// Resolve relative directory path and drop the perceived 'root' of the generated path.
// The root value is incorrect as it doesn't take into account System.baseURL.
// The resulting path will be fed into SystemJS for propert, full resolution.
const getResolvedFilePath = (filePath, relativeToPath) => {
  let resolvedFilePath = filePath;

  if (isBundling && filePath[0] === '.') {
    resolvedFilePath = path.resolve(relativeToPath, filePath);
    // css.source.input.from is incorrect when building. Need to convert from relative and then drop root
    // so that when giving the path to SystemJS' fetch it works as expected.
    resolvedFilePath = resolvedFilePath.replace(path.parse(resolvedFilePath).root, '');
  }

  return resolvedFilePath;
};

// Helper function given to PostCSS plugins. Used to retrieve CSS from other files without
// coupling the PostCSS plugin to a specific environment.
const getFileText = (filePath, relativeToPath) => {
  // relativeToPath references a file not a directory. Call path.dirname to strip the file.
  const resolvedFilePath = getResolvedFilePath(filePath, path.dirname(relativeToPath));
  const canonicalParent = relativeToPath.replace(/^\//, '');

  return System
    .normalize(resolvedFilePath, `${System.baseURL}${canonicalParent}`)
    .then((address) => System.fetch({ address, metadata: {} }));
};

const plugins = [
  atImport({
    resolve(filePath, relativeToPath) {
      const resolvedFilePath = getResolvedFilePath(filePath, relativeToPath);
      const canonicalParent = `${relativeToPath.replace(/^\//, '')}/`;

      return System.normalize(resolvedFilePath, `${System.baseURL}${canonicalParent}`);
    },
    load(filename) {
      return System.import(filename);
    }
  }),
  composesHelper,
  inlineTrait({
    getFileText,
    traitPath
  }),
  mixinFrom({
    getFileText
  }),
  mixins,
  nesting(),
  url({
    url: function(url) {
      var transformedUrl = url;

      // TODO: I don't especially feel like this plugin is necessary, but fontawesome fonts fail to load in dev environment without it.
      // For some reason I need to rewrite to include my baseURL or they don't work.
      // urls which reference data: don't need to be transformed since they reference static rather than a path.
      if (!isBundling && !url.includes('data:')) {
        transformedUrl = `${System.baseURL}${url}`;
      }

      return transformedUrl;
    }
  }),
  Plugins.values,
  Plugins.localByDefault,
  Plugins.extractImports,
  Plugins.scope,
  autoprefixer()
];

const { fetch, bundle } = new Loader(plugins);
export { fetch, bundle };