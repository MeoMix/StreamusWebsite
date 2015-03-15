require.config({
    baseUrl: 'js/',
    enforceDefine: true,

    shim: {
        bootstrap: {
            deps: ['jquery'],
            //  Bootstrap extends jQuery so it seems fitting to define it as the exports value.
            //  Discussion here: http://stackoverflow.com/questions/13377373/shim-twitter-bootstrap-for-requirejs
            exports: '$'
        },
        coinbase: {
            deps: ['jquery'],
            exports: 'window.coinbase'
        },
        'jquery.unveil': {
            deps: ['jquery'],
            exports: '$.fn.unveil'
        },
        googleAnalytics: {
            exports: 'window.ga'
        },
        zopim: {
            exports: 'window.$zopim'
        }
    },

    paths: {
        backbone: [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
            'thirdParty/backbone'
        ],
        'backbone.marionette': [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.4.1/backbone.marionette.min',
            'thirdParty/backbone.marionette'
        ],
        bootstrap: [
            '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.2/js/bootstrap.min',
            'thirdParty/bootstrap'
        ],
        coinbase: 'thirdParty/coinbase',
        googleAnalytics: 'thirdParty/googleAnalytics',
        'jquery.browser': [
            '//cdnjs.cloudflare.com/ajax/libs/jquery-browser/0.0.7/jquery.browser.min',
            'thirdParty/jquery.browser'
        ],
        jquery: [
            '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
            'thirdParty/jquery'
        ],
        'jquery.unveil': [
            '//cdnjs.cloudflare.com/ajax/libs/unveil/1.3.0/jquery.unveil.min',
            'thirdParty/jquery.unveil'
        ],
        //  Rename lodash to underscore since functionally equivilant but underscore is expected by other third party libraries.
        underscore: [
            '//cdnjs.cloudflare.com/ajax/libs/lodash.js/3.4.0/lodash.min',
            'thirdParty/lodash'
        ],
        template: '../template',
        text: [
            '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
            'thirdParty/text'
        ],
        zopim: 'thirdParty/zopim'
    }
});

//  I'm using define over require here intentionally. The data-main attribute in index.html counts as the require 
//  statement and define is needed here for the enforceDefine: true option to be fulfilled.
define(function(require) {
    'use strict';

    require('backbone.marionette');
    require('bootstrap');
    require('coinbase');
    require('googleAnalytics');
    require('jquery.browser');
    require('jquery.unveil');
    require('text');
    require('zopim');

    require(['application']);
});