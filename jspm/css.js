// NOTE: CSS Minification not supported until jspm v0.17.
// https://github.com/MeoMix/jspm-marionette-boilerplate/issues/12
import { Plugins } from 'jspm-loader-css/lib/plugins'
import { CSSLoader } from 'jspm-loader-css/lib/CSSLoader'
import values from 'postcss-modules-values';
import url from 'postcss-url';

// Make life easier by automating away most of the boilerplate for using traits.
// OLD:
// .foo {
//   composes: primary from '../common/css/traits/color.css';
// }
// 
// NEW:
// .foo:traits {
//   color: primary;
// }

let traits = (css) => {
  const isBundling = typeof window === 'undefined';
  const rootDir = isBundling ? 'compiled/' : '';
  const traitPath = `${rootDir}common/css/traits/`;

  const traitRegexp = /\:traits$/;
  // Translate any .module:traits usages
  css.walkRules(rule => {
    if (rule.selector.match(traitRegexp)) {
      rule.selector = rule.selector.replace(traitRegexp, '');
      rule.walkDecls(decl => {
        decl.value = `${decl.prop} ${decl.value} from "${traitPath}${decl.prop}.css"`;
        decl.prop = 'composes';
      });
    } else {
      rule.walkDecls(decl => {
        // Allow for omission of full path from composes statements. Assume traits path.
        // Don't assume relative paths are traits.
        if (decl.prop === 'composes' && decl.value.indexOf('.') === -1) {
          decl.value = decl.value.replace(/'(.*)'$/, `'${traitPath}$1.css'`);
        }
      });
    }
  });
}

let plugins = [
  traits,
  values,
  url({
    url: function(url) {
      var transformedUrl = url;

      // urls which reference data: don't need to be transformed since they reference static rather than a path.
      if (!url.includes('data:')) {
        transformedUrl = `${System.baseURL}${url}`;
      }

      return transformedUrl;
    }
  }),
  Plugins.localByDefault,
  Plugins.extractImports,
  Plugins.scope,
  Plugins.autoprefixer()
];

const { fetch, bundle } = new CSSLoader(plugins);

export { fetch, bundle };