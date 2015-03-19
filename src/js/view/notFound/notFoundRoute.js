define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var NotFoundView = require('view/notFound/notFoundView');

    var NotFoundRoute = Route.extend({
        type: RouteType.NotFound,

        show: function() {
            Streamus.channels.body.commands.trigger('showIn:region', new NotFoundView());
        }
    });

    return NotFoundRoute;
});