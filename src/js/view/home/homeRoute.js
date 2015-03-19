define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var HomeView = require('view/home/homeView');

    var HomeRoute = Route.extend({
        type: RouteType.Home,

        show: function() {
            Streamus.channels.body.commands.trigger('showIn:region', new HomeView());
        }
    });

    return HomeRoute;
});