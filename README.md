Streamus™ - Website
=========

The Streamus website is an alternative download point for the Streamus Google Chrome extension. It also contains a small instructional guide, a brief history of the program and a donation page.

Overview
========

The website utilizes many of the same libraries as Streamus. RequireJS, BackboneJS and Bootstrap are all in place. GruntJS (through Node) is used to create a deployment-ready
version of the website. See Gruntfile.js for more details. Other third-party libraries include: coinbase (bitcoin donation support), jQuery.unveil (lazy-load images) and zopim (website-IM integration.)

Deployment
========

Once you have NPM and Grunt installed you'll need to run "npm install" from the StreamusWebsite directory. This will cause all the necessary packages to install.
Then, call "grunt production" to spitout a dist folder with all the files needed to run a deploy version of the website. You shouldn't have to do anything special
to run a development version of the website -- simply open index.html in your favorite browser.

If you've touched any images -- you'll probably want to re-install grunt-contrib-imagemin and compress the images before uploading. This module isn't included by default because it is pretty bulky.

License
=======
This work is licensed under the Apache License v2.0

Authors
=======

* MeoMix - Original developer, main contributor.