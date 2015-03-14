define(function(require) {
    'use strict';

    var Route = require('enum/route');

    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            //  TODO: I don't feel like this is right... what's a better approach?
            '*allRoutes': 'showPage'
        },

        controller: {
            showPage: function(route) {
                var page = Streamus.pages.findWhere({
                    route: route
                });

                page.set('hidden', false);
            }
        },

        initialize: function() {
            //  Starting Backbone's history is a necessary first step for using the router.
            //  http://backbonejs.org/#Router
            Backbone.history.start({
                pushState: true
            });

            //  TODO: Is this the appropriate way to route to the initial route?
            var route = Backbone.history.fragment;

            if (route.trim() === '') {
                route = Route.Home;
            }

            this.controller.showPage(route);
        }
    });

    return Router;
});