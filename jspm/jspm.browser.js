SystemJS.config({
  // KarmaJS runs everything from a sub-directory.
  baseURL: window.__karma__ ? '/base/' : '/',
  paths: {
    'github:*': 'jspm/jspm_packages/github/*',
    'npm:*': 'jspm/jspm_packages/npm/*'
  }
});