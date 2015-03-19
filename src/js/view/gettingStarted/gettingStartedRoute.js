define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var GettingStartedView = require('view/gettingStarted/gettingStartedView');

    var GettingStartedRoute = Route.extend({
        type: RouteType.GettingStarted,

        show: function() {
            Streamus.channels.body.commands.trigger('showIn:region', new GettingStartedView());
        }
    });

    return GettingStartedRoute;
});