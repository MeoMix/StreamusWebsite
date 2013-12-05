define([
], function () {
    'use strict';

    var Router = Backbone.Router.extend({
        
        routes: {
            'home': 'showHome',
            'getting-started': 'showGettingStarted',
            'about': 'showAbout',
            'donate': 'showDonate'
        },

        initialize: function () {
            console.log("Router initialized");
            //  TODO: Should this go in initialize? Or maybe in bodyView's initialize?
            //  Starting Backbone's history is a necessary first step for using the router.
            //  http://backbonejs.org/#Router
            Backbone.history.start();
        },
        
        showHome: function() {
            console.log('Show Home called');
        },
        
        showGettingStarted: function() {
            console.log("Show Getting Started called");
        }
    });

    return Router;
});