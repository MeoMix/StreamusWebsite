define([
    'collection/contentPages',
    'enum/route'
], function (ContentPages, Route) {
    'use strict';

    var NavigationView = Backbone.View.extend({
        
        el: $('#navigation'),
        
        navigationItems: $('#navigation li'),
        homeNavigationItem: $('li#homeNavigationItem'),
        gettingStartedNavigationItem: $('li#gettingStartedNavigationItem'),
        aboutNavigationItem: $('li#aboutNavigationItem'),
        donateNavigationItem: $('li#donateNavigationItem'),
        
        initialize: function () {

            //  It's better to decorate these during initialization rather than inject via templating to prevent initial load lag.
            this.homeNavigationItem.attr('data-route', Route.Home);
            this.gettingStartedNavigationItem.attr('data-route', Route.GettingStarted);
            this.aboutNavigationItem.attr('data-route', Route.About);
            this.donateNavigationItem.attr('data-route', Route.Donate);

            this.listenTo(ContentPages, 'change:hidden', function (contentPage, hidden) {
                var navigationItem = this.navigationItems.filter('[data-route=' + contentPage.get('route') + ']');
                navigationItem.toggleClass('active', !hidden);
            });

        }
    });

    return NavigationView;
});