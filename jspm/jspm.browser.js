SystemJS.config({
  // KarmaJS runs everything from a sub-directory.
  baseURL: this.__karma__ ? '/base/' : '/',
  production: false,
  paths: {
    'github:*': 'jspm/jspm_packages/github/*',
    'npm:*': 'jspm/jspm_packages/npm/*'
  }
});