/* eslint-env node */
// Options:
// * gulp: Compile src files, spin-up local server, open browser, watch files for changes.
// * gulp build: Build a release from /compiled and place it into /dist.
// * gulp compile: Move files from /src to /compiled while transpiling ES6 to ES5.
// * gulp lint: Lint /src files for errors.
// * gulp test: Instantiate a Karma server and run specs found in /test.
// * gulp watch: Watch /src and /compiled files for changes.
const requireDir = require('require-dir');

// Load all the gulp tasks declared in /gulp directory so that gulp cli can leverage them.
requireDir('./gulp/tasks');