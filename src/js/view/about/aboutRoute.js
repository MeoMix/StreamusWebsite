define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var AboutView = require('view/about/aboutView');

    var AboutRoute = Route.extend({
        type: RouteType.About,

        show: function() {
            Streamus.channels.body.commands.trigger('showIn:region', new AboutView());
        }
    });

    return AboutRoute;
});