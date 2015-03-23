define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var DonateView = require('view/content/donate/donateView');

    var DonateRoute = Route.extend({
        type: RouteType.Donate,
        viewClass: DonateView
    });

    return DonateRoute;
});