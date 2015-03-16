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

Deployment
========

Once you have NPM and Grunt installed you'll need to run "npm install" from the StreamusWebsite directory. This will cause all the necessary packages to install.
Then, call "grunt build" to spitout a dist folder with all the files needed to run a deploy version of the website. You shouldn't have to do anything special
to run a development version of the website -- simply open index.html in your favorite browser with Apache 2.4 running on your machine.

If you've touched any images -- you'll probably want to re-install grunt-contrib-imagemin and compress the images before uploading. This module isn't included by default because it is pretty bulky.

Third-Party Libraries
------

Streamus Website utilizes several third-party libraries:

* [BackboneJS](http://backbonejs.org/)
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
