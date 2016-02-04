if (typeof window !== 'undefined') {
  var waitSeconds = 100;

  var head = document.getElementsByTagName('head')[0];

  // get all link tags in the page
  var links = document.getElementsByTagName('link');
  var linkHrefs = [];
  for (var i = 0; i < links.length; i++) {
    linkHrefs.push(links[i].href);
  }

  var isWebkit = !!window.navigator.userAgent.match(/AppleWebKit\/([^ ;]*)/);
  var webkitLoadCheck = function(link, callback) {
    setTimeout(function() {
      for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if (sheet.href == link.href)
          return callback();
      }
      webkitLoadCheck(link, callback);
    }, 10);
  };

  var noop = function() { };

  var loadCSS = function(url) {
    return new Promise(function(resolve, reject) {
      var timeout = setTimeout(function() {
        reject('Unable to load CSS');
      }, waitSeconds * 1000);
      var _callback = function(error) {
        clearTimeout(timeout);
        link.onload = link.onerror = noop;
        setTimeout(function() {
          if (error)
            reject(error);
          else
            resolve('');
        }, 7);
      };
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      if (!isWebkit) {
        link.onload = function() {
          _callback();
        }
      } else {
        webkitLoadCheck(link, _callback);
      }
      link.onerror = function(event) {
        _callback(event.error || new Error('Error loading CSS file.'));
      };
      head.appendChild(link);
    });
  };

  exports.fetch = function(load, systemFetch) {
    // dont reload styles loaded in the head
    for (var i = 0; i < linkHrefs.length; i++)
      if (load.address == linkHrefs[i])
        return '';

    var loader = this;

    console.log('this:', this, System, this === System);

    window.systemFetch = systemFetch;
    return new Promise(function(resolve, reject) {
      Promise.all([
        loader['import']('postcss'),
        loader['import']('postcss-import'),
        loader['import']('jspm/autoprefixer'),
        loader['import']('postcss-custom-properties'),
        loader['import']('postcss-url'),
        loader['import']('postcss-nesting')
      ]).then(function(modules) {
        var postcss = modules[0];
        var atImport = modules[1];
        var autoprefixer = modules[2];
        var customProperties = modules[3];
        var url = modules[4];
        var nesting = modules[5];

        var postCssPlugins = [
          // From postcss-import notes: This plugin should probably be used as the first plugin of your list.
          atImport({
            root: '/',
            skipDuplicates: false,
            async: true
          }),
          autoprefixer({ browsers: ['last 2 versions'] }),
          customProperties(),
          url({
            url: function(URL, decl, from, dirname, to, options, result) {
              console.log('hi:', URL, decl, from, dirname, to, options, result);
              var transformedUrl = URL;

              if (!URL.includes('data:')) {
                transformedUrl = System.normalizeSync(URL);
              }

              return transformedUrl;
            }
          }),
          nesting()
        ];
        var processor = postcss(postCssPlugins);

        systemFetch(load).then(function(source) {
          processor.process(source, {
            from: ''
          }).then(function(result) {
            var cssOutput = result.css;

            var blob = new Blob([cssOutput], { type: 'text/css' });
            var blobUrl = URL.createObjectURL(blob);

            loadCSS(blobUrl).then(function() {
              resolve('');
            });
          });
        });
      }, function(error) {
        console.log(error);
        reject(error);
      });
    });
  };
}
else {
  function getBuilder(loader) {
    return loader['import']('./css-builder' + (System.version ? '.js' : ''), { name: module.id });
  }

  exports.cssPlugin = true;
  exports.fetch = function(load) {
    // individually mark loads as not built for buildCSS false
    if (this.buildCSS === false)
      load.metadata.build = false;
    // setting format = 'defined' means we're managing our own output
    load.metadata.format = 'defined';
    // don't load the CSS at all until build time
    return '';
  };
  exports.instantiate = function() { };
  exports.bundle = function(loads, opts) {
    var loader = this;
    if (loader.buildCSS === false)
      return '';
    return getBuilder(loader).then(function(builder) {
      return builder.bundle.call(loader, loads, opts);
    });
  };
  exports.listAssets = function(loads, compileOpts, outputOpts) {
    var loader = this;
    return getBuilder(loader).then(function(builder) {
      return builder.listAssets.call(loader, loads, compileOpts, outputOpts);
    });
  };
}