define([
    'view/aboutContentView',
    'view/donateContentView',
    'view/gettingStartedContentView',
    'view/homeContentView'
], function (AboutContentView, DonateContentView, GettingStartedContentView, HomeContentView) {
    'use strict';

    var Router = Backbone.Router.extend({
        
        contentViews: [AboutContentView, DonateContentView, GettingStartedContentView, HomeContentView],
        
        routes: {
            '': 'showHome',
            'home': 'showHome',
            'getting-started': 'showGettingStarted',
            'about': 'showAbout',
            'donate': 'showDonate'
        },

        initialize: function () {
            //  Starting Backbone's history is a necessary first step for using the router.
            //  http://backbonejs.org/#Router
            Backbone.history.start();
        },
        
        showHome: function () {
            this.showContentView(HomeContentView);
        },
        
        showGettingStarted: function () {
            console.log("Show getting started");
            this.showContentView(GettingStartedContentView);
        },
        
        showAbout: function() {
            this.showContentView(AboutContentView);
        },
        
        showDonate: function() {
            this.showContentView(DonateContentView);
        },
        
        showContentView: function (contentView) {

            console.log("ContentView $el is hidden:", contentView.$el.is(':hidden'));

            if (contentView.$el.is(':hidden')) {
                this.hideAllContentViews();
                contentView.$el.show();
            }
        },
        
        hideAllContentViews: function() {
            _.each(this.contentViews, function (contentView) {
                console.log("Hiding view:", contentView);
                contentView.$el.hide();
            });
        }
    });

    return Router;
});