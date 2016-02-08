SystemJS.config({
  packageConfigPaths: [
      "npm:@*/*.json",
      "npm:*.json",
      "github:*/*.json"
  ],
  globalEvaluationScope: false,
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
        "runtime",
        "optimisation.modules.system"
    ],
    "moduleName": true
  },

  meta: {
    "*.css": {
      "loader": "jspm/css.js"
    },
    "*.hbs": {
      "loader": "hbs"
    }
  },

  map: {
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "autoprefixer": "npm:autoprefixer@6.3.1",
    "babel-polyfill": "npm:babel-polyfill@6.5.0",
    "babel-runtime": "npm:babel-runtime@5.8.35",
    "backbone": "npm:backbone@1.2.3",
    "backbone.babysitter": "github:marionettejs/backbone.babysitter@0.1.10",
    "backbone.base-router": "npm:backbone.base-router@1.3.0",
    "backbone.intercept": "npm:backbone.intercept@0.4.2",
    "backbone.syphon": "npm:backbone.syphon@0.6.3",
    "backbone.wreqr": "github:marionettejs/backbone.wreqr@1.3.5",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
    "core-js": "npm:core-js@1.2.6",
    "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "handlebars": "github:components/handlebars.js@4.0.5",
    "hbs": "github:davis/plugin-hbs@1.2.1",
    "jquery": "github:components/jquery@2.2.0",
    "jquery.browser": "npm:jquery.browser@0.1.0",
    "jspm-loader-css": "github:MeoMix/jspm-loader-css@1.0.4",
    "lodash": "npm:lodash@3.10.1",
    "marionette": "github:marionettejs/backbone.marionette@2.4.4",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.2",
    "postcss-mixins": "npm:postcss-mixins@4.0.0",
    "postcss-modules-values": "npm:postcss-modules-values@1.1.1",
    "postcss-nesting": "npm:postcss-nesting@2.2.0",
    "postcss-url": "npm:postcss-url@5.1.1",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
    "text": "github:systemjs/plugin-text@0.0.4",
    "uglify-js": "npm:uglify-js@2.3.6",
    "underscore": "lodash",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "vm": "github:jspm/nodelibs-vm@0.2.0-alpha",
    "webcomponents.js": "npm:webcomponents.js@0.7.20"
  },

  packages: {
    "github:MeoMix/jspm-loader-css@1.0.4": {
      "map": {
        "css-modules-loader-core": "npm:css-modules-loader-core@1.0.0",
        "debounce": "npm:debounce@1.0.0",
        "path": "npm:path@0.12.7",
        "toposort": "npm:toposort@0.2.12"
      },
      "meta": {
        "autoprefixer.js": {
          "format": "global"
        }
      }
    },
    "github:davis/plugin-hbs@1.2.1": {
      "map": {
        "handlebars": "github:components/handlebars.js@4.0.5"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.4.0"
      }
    },
    "github:jspm/nodelibs-crypto@0.2.0-alpha": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.0"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "github:marionettejs/backbone.marionette@2.4.4": {
      "map": {
        "backbone": "npm:backbone@1.2.3",
        "backbone.babysitter": "npm:backbone.babysitter@0.1.10",
        "backbone.wreqr": "npm:backbone.wreqr@1.3.5",
        "underscore": "npm:underscore@1.8.3"
      }
    },
    "npm:amdefine@1.0.0": {
      "map": {}
    },
    "npm:array-union@1.0.1": {
      "map": {
        "array-uniq": "npm:array-uniq@1.0.2"
      }
    },
    "npm:asn1.js@4.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:async@0.2.10": {
      "map": {}
    },
    "npm:autoprefixer@6.3.1": {
      "map": {
        "browserslist": "npm:browserslist@1.1.2",
        "caniuse-db": "npm:caniuse-db@1.0.30000409",
        "normalize-range": "npm:normalize-range@0.1.2",
        "num2fraction": "npm:num2fraction@1.2.2",
        "postcss": "npm:postcss@5.0.14",
        "postcss-value-parser": "npm:postcss-value-parser@3.2.3"
      }
    },
    "npm:caniuse-db@1.0.30000409": {
      defaultExtension: 'json'
    },
    "npm:babel-polyfill@6.5.0": {
      "map": {
        "babel-regenerator-runtime": "npm:babel-regenerator-runtime@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "core-js": "npm:core-js@1.2.6"
      }
    },
    "npm:babel-runtime@5.8.35": {
      "map": {}
    },
    "npm:backbone.babysitter@0.1.10": {
      "map": {
        "backbone": "npm:backbone@1.2.3",
        "underscore": "npm:underscore@1.8.3"
      }
    },
    "npm:backbone.base-router@1.3.0": {
      "map": {
        "backbone": "npm:backbone@1.2.3",
        "underscore": "npm:underscore@1.8.3"
      }
    },
    "npm:backbone.intercept@0.4.2": {
      "map": {
        "backbone": "npm:backbone@1.2.3",
        "underscore": "npm:underscore@1.8.3"
      }
    },
    "npm:backbone.syphon@0.6.3": {
      "map": {
        "backbone": "npm:backbone@1.2.3",
        "jquery": "npm:jquery@2.2.0",
        "underscore": "npm:underscore@1.8.3"
      }
    },
    "npm:backbone.wreqr@1.3.5": {
      "map": {
        "backbone": "npm:backbone@1.2.3",
        "underscore": "npm:underscore@1.8.3"
      }
    },
    "npm:backbone@1.2.3": {
      "map": {
        "underscore": "npm:underscore@1.8.3"
      }
    },
    "npm:balanced-match@0.3.0": {
      "map": {}
    },
    "npm:bn.js@4.10.1": {
      "map": {}
    },
    "npm:brace-expansion@1.1.2": {
      "map": {
        "balanced-match": "npm:balanced-match@0.3.0",
        "concat-map": "npm:concat-map@0.0.1"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.2",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "des.js": "npm:des.js@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-rsa@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "randombytes": "npm:randombytes@2.0.2"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "browserify-rsa": "npm:browserify-rsa@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "elliptic": "npm:elliptic@6.2.3",
        "inherits": "npm:inherits@2.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:browserslist@1.1.2": {
      "map": {
        "caniuse-db": "npm:caniuse-db@1.0.30000409"
      }
    },
    "npm:buffer-xor@1.0.3": {
      "map": {}
    },
    "npm:buffer@4.4.0": {
      "map": {
        "base64-js": "npm:base64-js@1.0.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:cipher-base@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:core-js@1.2.6": {
      "map": {}
    },
    "npm:core-util-is@1.0.2": {
      "map": {}
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "elliptic": "npm:elliptic@6.2.3"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.4"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "inherits": "npm:inherits@2.0.1",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "randombytes": "npm:randombytes@2.0.2"
      }
    },
    "npm:css-modules-loader-core@1.0.0": {
      "map": {
        "icss-replace-symbols": "npm:icss-replace-symbols@1.0.2",
        "postcss": "npm:postcss@5.0.10",
        "postcss-modules-extract-imports": "npm:postcss-modules-extract-imports@1.0.0",
        "postcss-modules-local-by-default": "npm:postcss-modules-local-by-default@1.0.0",
        "postcss-modules-scope": "npm:postcss-modules-scope@1.0.0",
        "postcss-modules-values": "npm:postcss-modules-values@1.1.0"
      }
    },
    "npm:css-selector-tokenizer@0.5.4": {
      "map": {
        "cssesc": "npm:cssesc@0.1.0",
        "fastparse": "npm:fastparse@1.1.1"
      }
    },
    "npm:debounce@1.0.0": {
      "map": {
        "date-now": "npm:date-now@1.0.1"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "miller-rabin": "npm:miller-rabin@4.0.0",
        "randombytes": "npm:randombytes@2.0.2"
      }
    },
    "npm:directory-encoder@0.7.2": {
      "map": {
        "fs-extra": "npm:fs-extra@0.23.1",
        "handlebars": "npm:handlebars@1.3.0",
        "img-stats": "npm:img-stats@0.5.2"
      }
    },
    "npm:elliptic@6.2.3": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "brorand": "npm:brorand@1.0.5",
        "hash.js": "npm:hash.js@1.0.3",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:fastparse@1.1.1": {
      "map": {}
    },
    "npm:fs-extra@0.23.1": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.3",
        "jsonfile": "npm:jsonfile@2.2.3",
        "path-is-absolute": "npm:path-is-absolute@1.0.0",
        "rimraf": "npm:rimraf@2.5.1"
      }
    },
    "npm:glob@6.0.4": {
      "map": {
        "inflight": "npm:inflight@1.0.4",
        "inherits": "npm:inherits@2.0.1",
        "minimatch": "npm:minimatch@3.0.0",
        "once": "npm:once@1.3.3",
        "path-is-absolute": "npm:path-is-absolute@1.0.0"
      }
    },
    "npm:globby@4.0.0": {
      "map": {
        "array-union": "npm:array-union@1.0.1",
        "arrify": "npm:arrify@1.0.1",
        "glob": "npm:glob@6.0.4",
        "object-assign": "npm:object-assign@4.0.1",
        "pify": "npm:pify@2.3.0",
        "pinkie-promise": "npm:pinkie-promise@2.0.0"
      }
    },
    "npm:graceful-fs@4.1.3": {
      "map": {}
    },
    "npm:handlebars@1.3.0": {
      "map": {
        "optimist": "npm:optimist@0.3.7"
      }
    },
    "npm:has-flag@1.0.0": {
      "map": {}
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:img-stats@0.5.2": {
      "map": {
        "xmldom": "npm:xmldom@0.1.22"
      }
    },
    "npm:inflight@1.0.4": {
      "map": {
        "once": "npm:once@1.3.3",
        "wrappy": "npm:wrappy@1.0.1"
      }
    },
    "npm:inherits@2.0.1": {
      "map": {}
    },
    "npm:isarray@1.0.0": {
      "map": {}
    },
    "npm:jquery.browser@0.1.0": {
      "map": {}
    },
    "npm:js-base64@2.1.9": {
      "map": {}
    },
    "npm:jsonfile@2.2.3": {
      "map": {}
    },
    "npm:lodash@3.10.1": {
      "map": {}
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "brorand": "npm:brorand@1.0.5"
      }
    },
    "npm:mime@1.3.4": {
      "map": {}
    },
    "npm:minimatch@3.0.0": {
      "map": {
        "brace-expansion": "npm:brace-expansion@1.1.2"
      }
    },
    "npm:mkdirp@0.5.1": {
      "map": {
        "minimist": "npm:minimist@0.0.8"
      }
    },
    "npm:once@1.3.3": {
      "map": {
        "wrappy": "npm:wrappy@1.0.1"
      }
    },
    "npm:optimist@0.3.7": {
      "map": {
        "wordwrap": "npm:wordwrap@0.0.3"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "asn1.js": "npm:asn1.js@4.4.0",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.4"
      }
    },
    "npm:path-is-absolute@1.0.0": {
      "map": {}
    },
    "npm:path@0.12.7": {
      "map": {
        "process": "npm:process@0.11.2",
        "util": "npm:util@0.10.3"
      }
    },
    "npm:pbkdf2@3.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:pify@2.3.0": {
      "map": {}
    },
    "npm:pinkie-promise@2.0.0": {
      "map": {
        "pinkie": "npm:pinkie@2.0.4"
      }
    },
    "npm:postcss-js@0.1.1": {
      "map": {
        "camelcase-css": "npm:camelcase-css@1.0.0",
        "postcss": "npm:postcss@5.0.14"
      }
    },
    "npm:postcss-mixins@4.0.0": {
      "map": {
        "globby": "npm:globby@4.0.0",
        "postcss": "npm:postcss@5.0.14",
        "postcss-js": "npm:postcss-js@0.1.1",
        "postcss-simple-vars": "npm:postcss-simple-vars@1.2.0"
      }
    },
    "npm:postcss-modules-extract-imports@1.0.0": {
      "map": {
        "postcss": "npm:postcss@5.0.14"
      }
    },
    "npm:postcss-modules-local-by-default@1.0.0": {
      "map": {
        "css-selector-tokenizer": "npm:css-selector-tokenizer@0.5.4",
        "postcss": "npm:postcss@5.0.14"
      }
    },
    "npm:postcss-modules-scope@1.0.0": {
      "map": {
        "css-selector-tokenizer": "npm:css-selector-tokenizer@0.5.4",
        "postcss": "npm:postcss@5.0.14"
      }
    },
    "npm:postcss-modules-values@1.1.0": {
      "map": {
        "icss-replace-symbols": "npm:icss-replace-symbols@1.0.2",
        "postcss": "npm:postcss@5.0.14"
      }
    },
    "npm:postcss-modules-values@1.1.1": {
      "map": {
        "icss-replace-symbols": "npm:icss-replace-symbols@1.0.2",
        "postcss": "npm:postcss@5.0.14"
      }
    },
    "npm:postcss-nesting@2.2.0": {
      "map": {
        "postcss": "npm:postcss@5.0.14"
      }
    },
    "npm:postcss-simple-vars@1.2.0": {
      "map": {
        "postcss": "npm:postcss@5.0.14"
      }
    },
    "npm:postcss-url@5.1.1": {
      "map": {
        "directory-encoder": "npm:directory-encoder@0.7.2",
        "js-base64": "npm:js-base64@2.1.9",
        "mime": "npm:mime@1.3.4",
        "minimatch": "npm:minimatch@3.0.0",
        "mkdirp": "npm:mkdirp@0.5.1",
        "path-is-absolute": "npm:path-is-absolute@1.0.0",
        "postcss": "npm:postcss@5.0.14"
      }
    },
    "npm:postcss@5.0.10": {
      "map": {
        "js-base64": "npm:js-base64@2.1.9",
        "source-map": "npm:source-map@0.5.3",
        "supports-color": "npm:supports-color@3.1.2"
      }
    },
    "npm:postcss@5.0.14": {
      "map": {
        "js-base64": "npm:js-base64@2.1.9",
        "source-map": "npm:source-map@0.5.3",
        "supports-color": "npm:supports-color@3.1.2"
      }
    },
    "npm:process@0.11.2": {
      "map": {}
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "browserify-rsa": "npm:browserify-rsa@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "randombytes": "npm:randombytes@2.0.2"
      }
    },
    "npm:punycode@1.3.2": {
      "map": {}
    },
    "npm:randombytes@2.0.2": {
      "map": {}
    },
    "npm:readable-stream@2.0.5": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@0.0.1",
        "process-nextick-args": "npm:process-nextick-args@1.0.6",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:rimraf@2.5.1": {
      "map": {
        "glob": "npm:glob@6.0.4"
      }
    },
    "npm:ripemd160@1.0.1": {
      "map": {}
    },
    "npm:sha.js@2.4.4": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:source-map@0.1.43": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:source-map@0.5.3": {
      "map": {}
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.0.5"
      }
    },
    "npm:string_decoder@0.10.31": {
      "map": {}
    },
    "npm:supports-color@3.1.2": {
      "map": {
        "has-flag": "npm:has-flag@1.0.0"
      }
    },
    "npm:toposort@0.2.12": {
      "map": {}
    },
    "npm:uglify-js@2.3.6": {
      "map": {
        "async": "npm:async@0.2.10",
        "optimist": "npm:optimist@0.3.7",
        "source-map": "npm:source-map@0.1.43"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:util@0.10.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:webcomponents.js@0.7.20": {
      "map": {}
    },
    "npm:xmldom@0.1.22": {
      "map": {}
    }
  }
});
