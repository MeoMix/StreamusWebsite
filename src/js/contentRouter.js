define([
    'collection/contentPages',
    'enum/route'
], function (ContentPages, Route) {
    'use strict';

    var ContentRouter = Backbone.Router.extend({

        defaultRoute: Route.Home,

        routes: {
            '*allRoutes': 'routeToContentView'
        },

        initialize: function () {
            //  Starting Backbone's history is a necessary first step for using the router.
            //  http://backbonejs.org/#Router
            Backbone.history.start();
        },
        
        routeToContentView: function () {
            var route = Backbone.history.fragment;
            
            if ($.trim(route) === '') {
                route = this.defaultRoute;
            }

            var contentPage = ContentPages.findWhere({ route: route });

            //  If the desired content page is hidden -- hide whichever page is visible and and show the desired page.
            if (contentPage.get('hidden')) {
                var visibleContentPage = ContentPages.findWhere({ hidden: false });
                
                if (visibleContentPage !== undefined) {
                    visibleContentPage.set('hidden', true);
                }
                
                contentPage.set('hidden', false);
            }
        }
       
    });

    return ContentRouter;
});