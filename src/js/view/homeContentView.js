define([
    'view/genericContentView',
    'model/contentPage'
], function (GenericContentView, ContentPage) {
    'use strict';

    var HomeContentView = GenericContentView.extend({
        el: $('#homeContent'),
        
        model: new ContentPage({
            route: 'home'
        })
    });

    return HomeContentView;
});