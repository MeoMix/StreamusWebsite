require.config({
    
    baseUrl: 'js/',
    
    //  To get timely, correct error triggers in IE, 
    //  force a define/shim exports check.
    enforceDefine: true,
    
    shim: {

        backbone: {
            //  These script dependencies should be loaded before loading backbone.js
            deps: ['lodash', 'jquery'],
            //  Once loaded, use the global 'Backbone' as the module value.
            exports: 'Backbone'
        },
        
        bootstrap: {
            deps: ['jquery'],
            //  Bootstrap extends jQuery so it seems fitting to define it as the exports value.
            //  Discussion here: http://stackoverflow.com/questions/13377373/shim-twitter-bootstrap-for-requirejs
            exports: '$'
        },
        
        coinbase: {
            deps: ['jquery'],
            exports: 'window.Coinbase'
        },

        'jquery.browser': {
            deps: ['jquery'],
            exports: 'jQuery.browser'
        },
        
        googleAnalyticsScript: {
            exports: 'window.GoogleAnalyticsObject'
        },
        
        zopim: {
            exports: 'window.$zopim'
        }

    },

    paths: {
        
        //  Third Party:
        backbone: [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
            //  If the CDN location fails, load from this location
            'thirdParty/backbone'
        ],
        bootstrap: [
            '//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min',
            //  If the CDN location fails, load from this location
            'thirdParty/bootstrap'
        ],
        coinbase: 'thirdParty/coinbase',
        googleAnalyticsScript: 'thirdParty/googleAnalyticsScript',
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
            //  If the CDN location fails, load from this location
            'thirdParty/jquery'
        ],
        'jquery.browser': 'thirdParty/jquery.browser',
        lodash: [
            '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.0/lodash.min',
            //  If the CDN location fails, load from this location
            'thirdParty/lodash'
        ],
        template: '../template',
        text: 'thirdParty/text',
        zopim: 'thirdParty/zopim'
    }

});

//  The data-main attribute counts as the require statement and define is needed here for enforceDefine: true.
//  TODO: jQueryBrowser is undefined here because I can't pass $.browser as an object name... is there a way to do this better?
define([
    'backbone',
    'bootstrap',
    'coinbase',
    'googleAnalyticsScript',
    'jquery.browser',
    'jquery',
    'lodash',
    'text',
    'zopim'
], function (Backbone, Bootstrap, Coinbase, GoogleAnalyticsObject, jQueryBrowser, $, _, text, $zopim) {
    'use strict';

    //  Load this once everything else is ready.
    require(['view/bodyView']);
});