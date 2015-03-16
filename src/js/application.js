define(function(require) {
    'use strict';

    var Router = require('router');
    var Pages = require('collection/pages');
    var BodyView = require('view/bodyView');

    var Application = Marionette.Application.extend({
        //  Set this flag to true to enable localhost server & debugging flags.
        localDebug: true,
        router: null,
        pages: null,
        serverUrl: '',

        channels: {
            dialog: Backbone.Wreqr.radio.channel('dialog'),
            share: Backbone.Wreqr.radio.channel('share'),
            body: Backbone.Wreqr.radio.channel('body')
        },

        initialize: function () {
            this._setServerUrl();
            this.on('start', this._onStart);
        },
        
        _setServerUrl: function () {
            this.serverUrl = this.localDebug ? 'http://localhost:39853/' : 'https://aws-server.streamus.com/Streamus/';
        },

        _onStart: function() {
            //  TODO: Make this not as order-dependent
            this.pages = new Pages();

            var bodyView = new BodyView();
            bodyView.render();

            this.router = new Router();
            
            //  Starting Backbone's history is a necessary first step for using the router.
            //  http://backbonejs.org/#Router
            Backbone.history.start({
                pushState: true
            });
        }
    });

    window.Streamus = new Application();
    Streamus.start();
});