define([
    'view/genericContentView',
    'model/contentPage',
    'enum/route'
], function (GenericContentView, ContentPage, Route) {
    'use strict';

    var HomeContentView = GenericContentView.extend({
        el: $('#homeContent'),
        
        model: new ContentPage({
            route: Route.Home
        })
    });

    return HomeContentView;
});