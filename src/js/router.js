define(function(require) {
    'use strict';

    //  TODO: 404 page
    var Route = require('enum/route');

    var Router = Marionette.AppRouter.extend({
        routes: {
            '': '_showHomePage',
            'share/:entityType/:shortId/:urlFriendlyEntityTitle': '_showSharePage',
            //  TODO: Is this an OK approach?
            '*allPages': '_showPage',
        },

        _showHomePage: function() {
            Streamus.pages.showByRoute(Route.Home);
        },
        
        _showPage: function (route) {
            Streamus.pages.showByRoute(route);
        },

        //  TODO: This is ass backwards. How can I have the ShareView give this to the router without causing a circular-reference
        _showSharePage: function (entityType, shortId, urlFriendlyEntityTitle) {
            Streamus.pages.showByRoute(Route.Share);
            Streamus.channels.share.commands.trigger('load:entity', {
                entityType: entityType,
                shortId: shortId,
                urlFriendlyEntityTitle: urlFriendlyEntityTitle
            });
        }
    });

    return Router;
});