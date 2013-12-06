define([
    'collection/contentPages'
], function (ContentPages) {
    'use strict';

    var NavigationView = Backbone.View.extend({
        
        el: $('#navigation'),
        
        navigationItems: $('#navigation li[data-route]'),
        
        initialize: function() {

            this.listenTo(ContentPages, 'change:hidden', function (contentPage, hidden) {
                var navigationItem = this.navigationItems.filter('[data-route=' + contentPage.get('route') + ']');
                navigationItem.toggleClass('active', !hidden);
            });

        }
    });

    return NavigationView;
});