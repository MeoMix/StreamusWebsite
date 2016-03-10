import postcss from 'postcss';
import postcssPlugins from './postcssPlugins.js';

const fetch = (load, systemFetch) => {
  const sourcePath = load.address.replace(System.baseURL, '');
  console.log('fetching trait:', load.address);
  return systemFetch(load)
    .then((source) =>
      postcss(postcssPlugins)
        .process(source, { from: `/${sourcePath}` })
        .then((result) => {
        return `module.exports = ${JSON.stringify(result.css)}`;
      })
    );

};
// TODO: I don't think I need to implement this.
const bundle = () => {};

export { fetch, bundle };