import { CSSLoader, Plugins } from 'jspm-loader-css'
import nesting from 'postcss-nesting';
import url from 'postcss-url';
import customProperties from 'postcss-custom-properties';
import atImport from 'postcss-import';

const { fetch, bundle } = new CSSLoader([
  atImport({
    root: '/',
    skipDuplicates: false,
    async: true
  }),
  customProperties(),
  url({
    url: function(URL, decl, from, dirname, to, options, result) {
      console.log('hi:', URL, decl, from, dirname, to, options, result);
      var transformedUrl = URL;

      if (!URL.includes('data:')) {
        transformedUrl = System.normalizeSync(URL);
      }

      return transformedUrl;
    }
  }),
  nesting(),
  Plugins.localByDefault,
  Plugins.extractImports,
  Plugins.scope,
  Plugins.autoprefixer()
], __moduleName);

export { fetch, bundle };