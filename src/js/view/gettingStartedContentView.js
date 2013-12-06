define([
    'view/genericContentView',
    'model/contentPage'
], function (GenericContentView, ContentPage) {
    'use strict';

    var GettingStartedContentView = GenericContentView.extend({
        el: $('#gettingStartedContent'),
        
        model: new ContentPage({
            route: 'getting-started'
        }),

        lazyImages: $('#gettingStartedContent img[data-src]')

    });

    return GettingStartedContentView;
});