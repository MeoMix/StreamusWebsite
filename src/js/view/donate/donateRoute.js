define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var DonateView = require('view/donate/donateView');

    var DonateRoute = Route.extend({
        type: RouteType.Donate,

        show: function() {
            Streamus.channels.body.commands.trigger('showIn:region', new DonateView());
        }
    });

    return DonateRoute;
});