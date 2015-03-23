define(function(require) {
    'use strict';

    var RouteType = require('enum/routeType');

    var NavigationItem = Backbone.Model.extend({
        defaults: {
            route: RouteType.NotFound,
            //  TODO: This is just for decorating classes.
            tag: RouteType.NotFound,
            active: false,
            text: ''
        }
    });

    return NavigationItem;
});