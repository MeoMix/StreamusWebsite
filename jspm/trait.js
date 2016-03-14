import postcss from 'postcss';
import postcssPlugins from './postcssPlugins.js';

export const fetch = (load, systemFetch) => {
  return systemFetch(load)
    .then((source) =>
      postcss(postcssPlugins)
        .process(source, { from: `/${load.address.replace(System.baseURL, '')}` })
        .then((result) => `module.exports = ${JSON.stringify(result.css)}`)
    );
};