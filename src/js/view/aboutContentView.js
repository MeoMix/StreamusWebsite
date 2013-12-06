define([
    'view/genericContentView',
    'model/contentPage',
    'enum/route'
], function (GenericContentView, ContentPage, Route) {
    'use strict';

    var AboutContentView = GenericContentView.extend({
        el: $('#aboutContent'),
        
        model: new ContentPage({
            route: Route.About
        })
    });

    return AboutContentView;
});