define([
    'collection/contentPages'
], function (ContentPages) {
    'use strict';

    var ContentRouter = Backbone.Router.extend({

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
            var contentPage = ContentPages.findWhere({ route: route });

            console.log("Content page:", contentPage);

            //  If the desired content page is hidden -- hide whichever page is visible and and show the desired page.
            if (contentPage.get('hidden')) {
                var visibleContentPage = ContentPages.findWhere({ hidden: false });
                
                if (visibleContentPage !== undefined) {
                    visibleContentPage.set('hidden', true);
                }
                
                contentPage.set('hidden', false);
                console.log("Set hidden to false");
            }
        }
       
    });

    return ContentRouter;
});