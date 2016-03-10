import cssModulesPlugins from 'jspm-loader-css/src/plugins.js'
import Loader from 'jspm-loader-css/src/loader.js'
import postcssPlugins from './postcssPlugins.js';

const plugins = postcssPlugins.concat([
  cssModulesPlugins.values,
  cssModulesPlugins.localByDefault,
  cssModulesPlugins.extractImports,
  cssModulesPlugins.scope
]);

const { fetch, bundle } = new Loader(plugins);
export { fetch, bundle };