define([
    'view/genericContentView',
    'model/contentPage',
    'enum/route'
], function (GenericContentView, ContentPage, Route) {
    'use strict';

    var GettingStartedContentView = GenericContentView.extend({
        el: $('#gettingStartedContent'),
        
        model: new ContentPage({
            route: Route.GettingStarted
        })

    });

    return GettingStartedContentView;
});