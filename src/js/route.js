define(function(require) {
    'use strict';

    var RouteType = require('enum/routeType');

    var Route = Marionette.Object.extend({
        type: RouteType.NotFound,
        viewClass: null,

        show: function(routeData) {
            Streamus.channels.content.commands.trigger('region:hideView');
            Streamus.channels.content.commands.trigger('region:showView:' + this.type, this.viewClass, this.getViewOptions(routeData.params));
        },

        getViewOptions: _.noop,

        onError: function(error) {
            console.error(error);
        }
    });

    return Route;
});