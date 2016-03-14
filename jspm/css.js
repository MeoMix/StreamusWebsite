import cssModulesPlugins from 'jspm-loader-css/src/plugins.js'
import Loader from 'jspm-loader-css/src/loader.js'
import postcssPlugins from './postcssPlugins.js';

export const { fetch, bundle } = new Loader(postcssPlugins.concat([
  cssModulesPlugins.localByDefault,
  cssModulesPlugins.extractImports,
  cssModulesPlugins.scope
]));