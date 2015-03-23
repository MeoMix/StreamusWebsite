define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var AboutView = require('view/content/about/aboutView');

    var AboutRoute = Route.extend({
        type: RouteType.About,
        viewClass: AboutView
    });

    return AboutRoute;
});