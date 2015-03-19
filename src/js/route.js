define(function(require) {
    'use strict';

    var RouteType = require('enum/routeType');

    var Route = Marionette.Object.extend({
        type: RouteType.NotFound,
        show: _.noop,
        onError: function(error) {
            console.error(error);
        }
    });

    return Route;
});