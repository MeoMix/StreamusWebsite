<h1 align="center">Streamus - Website</h1>
<p align="center">The website for Streamus - The most popular Chrome extension YouTube music player</p>
<p align="center">
  <a title='Build Status' href="https://travis-ci.org/MeoMix/StreamusWebsite">
    <img src='https://travis-ci.org/MeoMix/StreamusWebsite.svg' />
  </a>
</p>

Overview
========
The Streamus website is an alternative download point for the Streamus Google Chrome extension. It also contains a small instructional guide, a brief history of the program and a donation page.

Development
========

1. Ensure you have Node, NPM, and Grunt installed.
2. Run "npm install" to install necessary dependencies.
3. Install Apache 2.4 and configure it such that it can find src/index.html
4. Run "grunt less" and then "grunt watch" to compile LESS to CSS and monitor for changes.
5. Navigate to index.html in the browser.
6. To build a release, run "grunt build". Versioning is not yet supported.

**Apache Configuration for Windows:** In order to develop Streamus' website properly you'll need to configure Apache. A few things are needed:

* You'll want to navigate to your hosts file and add entries for: "127.0.0.1 src.streamus.com" and "127.0.0.1 dist.streamus.com". This will allow for named websites instead of just localhost which helps satisfy CORS.
* You then need to modify your VHosts to expect these websites. My config looks like:

><VirtualHost src.streamus.com:80=''>
>  DocumentRoot "${WEBSITEROOT}/src"
>  ServerName src.streamus.com
></VirtualHost>

><VirtualHost dist.streamus.com:80=''>
>  DocumentRoot "${WEBSITEROOT}/dist"
>  ServerName dist.streamus.com
></VirtualHost>

where WEBSITEROOT points to my src directory such as:

> Define WEBSITEROOT "/Users/Meo/Documents/GitHub/StreamusWebsite"

**Server settings:** Be sure to set localDebug to false in application.js unless you have a local instance of Streamus' server running.

Third-Party Libraries
------

Streamus Website utilizes several third-party libraries:

* [BackboneJS](http://backbonejs.org/)
* [Backbone.Base-Router](https://github.com/jmeas/backbone.base-router)
* [Backbone.Intercept](https://github.com/jmeas/backbone.intercept)
* [Backbone MarionetteJS](http://marionettejs.com)
* [Bootstrap](http://getbootstrap.com)
* [jQuery](http://jquery.com/)
* [jQuery Browser](https://github.com/gabceb/jquery-browser-plugin)
* [jQuery Unveil](https://github.com/luis-almeida/unveil)
* [Less](http://lesscss.org)
* [Lo-Dash](http://lodash.com/)
* [RequireJS](http://requirejs.org/)
* [Text](https://github.com/requirejs/text)

License
=======

Licensed under the Apache License, Version 2.0 (the "License");
you may not use any files in this repository except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.