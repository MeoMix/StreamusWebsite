define(function (require) {
    'use strict';

    var Route = require('enum/route');

    var Page = Backbone.Model.extend({
        defaults: {
            route: Route.None,
            hidden: true
        }
    });

    return Page;
});