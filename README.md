Streamus™ - Website
=========

The Streamus website is an alternative download point for the extension. It also contains a small instructional guide, a brief history of the program and a donation page.

Overview
========

The website utilizes many of the same libraries as the extension. RequireJS, BackboneJS and Bootstrap are all in place. GruntJS (through Node) is used to create a deployment-ready
version of the website. See Gruntfile.js for more details.

Deployment
========

Once you have NPM and Grunt installed, just run "grunt production." This will create a dist. folder along with all of the files ready to go.
If you've touched any images -- you'll probably want to re-install grunt-contrib-imagemin and compress the images before uploading. This module isn't included by default because it is pretty bulky.

License
=======
This work is licensed under the GNU General Public License v2 (GPL-2.0)

Authors
=======

* MeoMix - Original developer, main contributor.