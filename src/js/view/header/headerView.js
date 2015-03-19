define(function(require) {
    'use strict';

    var LogoView = require('view/header/logoView');
    var NavigationView = require('view/header/navigationView');
    var NavigationItems = require('collection/navigationItems');
    var RouteType = require('enum/routeType');

    var HeaderView = Marionette.LayoutView.extend({
        el: '.header',
        template: false,

        regions: {
            logoRegion: '.logoRegion',
            navigationRegion: '.navigationRegion'
        },

        onRender: function() {
            this._renderLogo();
            this._renderNavigation();
        },

        _renderLogo: function() {
            this.logoRegion.show(new LogoView());
        },

        _renderNavigation: function() {
            var navigationItems = new NavigationItems([{
                text: 'Home',
                routeType: RouteType.Home
            }, {
                text: 'Getting Started',
                routeType: RouteType.GettingStarted
            }, {
                text: 'Share',
                routeType: RouteType.Share
            }, {
                text: 'About',
                routeType: RouteType.About
            }, {
                text: 'Donate',
                routeType: RouteType.Donate
            }]);

            this.navigationRegion.show(new NavigationView({
                collection: navigationItems
            }));
        }
    });

    return HeaderView;
});