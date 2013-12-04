require.config({
    
    baseUrl: '/src/js/',

    shim: {

        backbone: {
            //  These script dependencies should be loaded before loading backbone.js
            deps: ['lodash', 'jquery'],
            //  Once loaded, use the global 'Backbone' as the module value.
            exports: 'Backbone'
        },
        
        bootstrap: {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },
        
        coinbase: {
            exports: 'Coinbase'
        },
        
        detectMobileBrowser: {
            exports: 'DetectMobileBrowser',
            deps: ['jquery']
        },
        
        facebookButtonScript: {
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
        
        //  Third Party:
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
        bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min',
        coinbase: 'thirdParty/coinbase',
        detectMobileBrowser: 'thirdParty/detectMobileBrowser',
        googleAnalytics: 'thirdParty/googleAnalytics',
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
        lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.0/lodash.min',
        text: 'thirdParty/text',
        zopim: 'thirdParty/zopim',
        
        //  View:
        aboutContentView: 'view/aboutContentView',
        bodyView: 'view/bodyView',
        contactView: 'view/contactView',
        donateContentView: 'view/donateContentView',
        footerView: 'view/footerView',
        genericDialogView: 'view/genericDialogView',
        gettingStartedContentView: 'view/gettingStartedContentView',
        homeContentView: 'view/homeContentView',
        installButtonView: 'view/installButtonView',
        logoView: 'view/logoView',
        privacyView: 'view/privacyView',
        socialView: 'view/socialView',
        termsOfUseView: 'view/termsOfUseView'
        
    }

});

require([
    'jquery',
    'backbone',
    'bootstrap',
    'lodash',
    'coinbase',
    'detectMobileBrowser',
    'googleAnalytics',
    'text',
    'zopim'
], function ($, Backbone, Bootstrap, _, Coinbase, DetectMobileBrowser, GoogleAnalytics, Text, Zopim) {
    'use strict';

    //  Load this once everything else is ready.
    require(['bodyView']);
});