define(function(require) {
    'use strict';

    var NavigationTemplate = require('text!template/header/navigation.html');
    var NavigationItems = require('collection/navigationItems');
    var RouteType = require('enum/routeType');
    var NavigationItemsView = require('view/header/navigationItemsView');

    var NavigationView = Marionette.LayoutView.extend({
        template: _.template(NavigationTemplate),
        
        regions: {
            navigationItemsRegion: '.navigationItemsRegion'
        },
        
        onRender: function() {
            this._renderNavigationItems();
        },
        
        _renderNavigationItems: function() {
            var navigationItems = new NavigationItems([{
                text: 'Home',
                route: RouteType.Home
            }, {
                text: 'Getting Started',
                route: RouteType.GettingStarted
            }, {
                text: 'FAQ',
                route: RouteType.Faq
            }, {
                text: 'Share',
                route: RouteType.Share
            }, {
                text: 'About',
                route: RouteType.About
            }, {
                text: 'Donate',
                route: RouteType.Donate
            }, {
                text: 'Coachella!',
                route: RouteType.Share + '/playlist/coachella'
            }]);
            
            this.navigationItemsRegion.show(new NavigationItemsView({
                collection: navigationItems
            }));
        }
    });

    return NavigationView;
});