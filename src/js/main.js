require.config({
    
    baseUrl: './js/',

    shim: {

        backbone: {
            //  These script dependencies should be loaded before loading backbone.js
            deps: ['lodash', 'jquery'],
            //  Once loaded, use the global 'Backbone' as the module value.
            exports: 'Backbone'
        },
        
        coinbase: {
            exports: 'Coinbase'
        },
        
        detectMobileBrowser: {
            exports: 'DetectMobileBrowser',
            deps: ['jquery']
        },
        
        facebookButton: {
            exports: 'FacebookButton'
        },
        
        googleAnalytics: {
            exports: 'GoogleAnalytics'
        },
        
        googlePlusButton: {
            exports: 'GooglePlusButton'
        },
        
        twitterButton: {
            exports: 'TwitterButton'
        },
        
        zopim: {
            exports: 'Zopim'
        }
    },

    paths: {
        
        index: 'index',
        installButtonView: 'installButtonView',
        main: 'main',

        //  Third Party:
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
        bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min',
        coinbase: 'thirdParty/coinbase',
        detectMobileBrowser: 'thirdParty/detectMobileBrowser',
        facebookButton: 'thirdParty/facebookButton',
        googleAnalytics: 'thirdParty/googleAnalytics',
        googlePlusButton: 'thirdParty/googlePlusButton',
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
        lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.0/lodash.min',
        twitterButton: 'thirdParty/twitterButton',
        zopim: 'thirdParty/zopim'
        
    }

});

require([
    'jquery',
    'backbone',
    'lodash',
    'coinbase',
    'detectMobileBrowser',
    'facebookButton',
    'googleAnalytics',
    'googlePlusButton',
    'twitterButton',
    'zopim'
], function ($, Backbone, _, Coinbase, DetectMobileBrowser, FacebookButton, GoogleAnalytics, GooglePlusButton, TwitterButton, Zopim) {
    'use strict';

    //  Load this once everything else is ready.
    require(['index']);
});