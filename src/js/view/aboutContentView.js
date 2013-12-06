define([
    'view/genericContentView',
    'model/contentPage'
], function (GenericContentView, ContentPage) {
    'use strict';

    var AboutContentView = GenericContentView.extend({
        el: $('#aboutContent'),
        
        model: new ContentPage({
            route: 'about'
        }),
        
        lazyImages: $('#aboutContent img[data-src]')
      
    });

    return AboutContentView;
});