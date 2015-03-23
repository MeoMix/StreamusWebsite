define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var GettingStartedView = require('view/content/gettingStarted/gettingStartedView');

    var GettingStartedRoute = Route.extend({
        type: RouteType.GettingStarted,
        viewClass: GettingStartedView
    });

    return GettingStartedRoute;
});