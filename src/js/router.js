define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var HomeRoute = require('view/home/homeRoute');
    var GettingStartedRoute = require('view/gettingStarted/gettingStartedRoute');
    var ShareRoute = require('view/share/shareRoute');
    var AboutRoute = require('view/about/aboutRoute');
    var DonateRoute = require('view/donate/donateRoute');
    var NotFoundRoute = require('view/notFound/notFoundRoute');

    var Router = Backbone.BaseRouter.extend({
        onNavigate: function(routeData) {
            var newRoute = routeData.linked;

            if (!(newRoute instanceof Route)) {
                throw new Error('A Route object must be associated with each route.');
            }

            newRoute.show(routeData);
            Streamus.channels.route.vent.trigger('shown', newRoute.type);
        },

        routes: function() {
            var routes = {};
            
            routes[RouteType.Home] = new HomeRoute();
            routes[RouteType.GettingStarted] = new GettingStartedRoute();
            routes[RouteType.Share] = new ShareRoute();
            routes[RouteType.Share + '/:entityType/:shortId/:urlFriendlyEntityTitle'] = new ShareRoute();
            routes[RouteType.About] = new AboutRoute();
            routes[RouteType.Donate] = new DonateRoute();
            routes[RouteType.NotFound] = new NotFoundRoute();

            return routes;
        }
    });

    return Router;
});