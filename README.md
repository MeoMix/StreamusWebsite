<h1 align="center">Streamus - Website</h1>
<p align="center">The website for Streamus - The most popular Chrome extension YouTube music player</p>
<p align="center">
  <a title='Build Status' href="https://travis-ci.org/MeoMix/StreamusWebsite">
    <img src='https://travis-ci.org/MeoMix/StreamusWebsite.svg' />
  </a>
</p>

<h2>Overview</h2>

Streamus Website is a single-page website leveraging HTML5 push state. The design is shaped around Google's [Material Design specification](https://www.google.com/design/spec/material-design). Some portions of the website are able to communicate with [Streamus Chrome Extension](https://github.com/MeoMix/StreamusChromeExtension) and/or [Streamus Server](https://github.com/MeoMix/StreamusServer)

<h2>Development</h2>

Start by cloning the development branch. All PRs should be submitted to the development branch. Non-trivial PRs will be declined unless they are accompanied by test cases.

<h3>Dependencies</h3>

You will need to have [Node](https://nodejs.org/) and [Gulp](http://gulpjs.com/) installed on your system. After installing Node, navigate useing a terminal to the direction in which you cloned this repository. Then, run the following command to install dependencies:

```
npm install
```

Successful installation of Node dependencies will result in [jspm](http://jspm.io/) being installed on your system in addition to all development dependencies. Successful installation of jspm will result in all production dependencies being installed, as well.

You should then run the test case suite to ensure you're in a known good state:

```
gulp test
```

Karma's test suite will then be ran against both Google Chrome and Firefox, if available.

<h3>Gulp Tasks</h3>

The following Gulp tasks are available:

* Build: Generate a production-ready build of the website and place it in the dist folder.
* Compile: Transpile ES6 to ES5 through Babel and copy all other assets into the compiled folder. Suitable for development use.
* Connect: Spin up a simple HTTP server via Node. Points at the compiled or dist directory depending on arguments given to connect.
* Lint: Validate code quality with ESLint and output issues to the console.
* Test: Run test case suite through Karma. Karma will open Chrome and Firefox and ensure test cases pass in both.
* Watch: Monitor the src and compiled directories for changes. Simple HTTP server will reload as changes are detected.

<h2>Libraries</h2>

<h3>Production</h3>
* [jQuery](http://jquery.com/)
* [Backbone](http://backbonejs.org/)
* [Marionette](http://marionettejs.com)
* [lodash](http://lodash.com/)
* [Handlebars](http://handlebarsjs.com/)
* [Backbone.Base-Router](https://github.com/jmeas/backbone.base-router)
* [Backbone.Intercept](https://github.com/jmeas/backbone.intercept)
* [Backbone.Syphon](https://github.com/marionettejs/backbone.syphon)
* [jQuery.browser](https://github.com/gabceb/jquery-browser-plugin)
* [webcomponents.js](https://github.com/WebComponents/webcomponentsjs)

<h3>Development</h3>
* [jspm](http://jspm.io//)
* [PostCSS](https://github.com/postcss/postcss)
* [Babel](https://babeljs.io/)
* [Gulp](http://gulpjs.com/)
* [Mocha](http://visionmedia.github.io/mocha/)
* [Chai](http://chaijs.com/)
* [Sinon](http://sinonjs.org/)
* [Karma](https://karma-runner.github.io/)
* [ESLint](http://eslint.org/)
