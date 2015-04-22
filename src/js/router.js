define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var HomeRoute = require('view/content/home/homeRoute');
    var FaqRoute = require('view/content/faq/faqRoute');
    var GettingStartedRoute = require('view/content/gettingStarted/gettingStartedRoute');
    var ShareRoute = require('view/content/share/shareRoute');
    var AboutRoute = require('view/content/about/aboutRoute');
    var DonateRoute = require('view/content/donate/donateRoute');
    var NotFoundRoute = require('view/content/notFound/notFoundRoute');

    var Router = Backbone.BaseRouter.extend({
        onNavigate: function(routeData) {
            var newRoute = routeData.linked;

            if (!(newRoute instanceof Route)) {
                throw new Error('A Route object must be associated with each route.');
            }

            newRoute.show(routeData);
            Streamus.channels.route.vent.trigger('shown', newRoute.type, routeData);
            Streamus.analyticsManager.sendPageView();
        },

        routes: function() {
            var routes = {};

            routes[RouteType.Home] = new HomeRoute();
            routes[RouteType.GettingStarted] = new GettingStartedRoute();
            routes[RouteType.Faq] = new FaqRoute();
            routes[RouteType.Faq + '/:activeSubjectId'] = new FaqRoute();
            routes[RouteType.Share] = new ShareRoute();
            routes[RouteType.Share + '/:entityType/:shortId'] = new ShareRoute();
            routes[RouteType.Share + '/:entityType/:shortId/:urlFriendlyEntityTitle'] = new ShareRoute();
            routes[RouteType.About] = new AboutRoute();
            routes[RouteType.Donate] = new DonateRoute();
            routes[RouteType.NotFound] = new NotFoundRoute();

            return routes;
        }
    });

    return Router;
});