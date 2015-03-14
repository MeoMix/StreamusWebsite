define(function (require) {
    'use strict';
    
    var Router = require('router');
    var Pages = require('collection/pages');
    var BodyView = require('view/bodyView');

    var Application = Marionette.Application.extend({
        router: null,
        pages: null,
        
        channels: {
            dialog: Backbone.Wreqr.radio.channel('dialog')
        },

        initialize: function () {
            this.on('start', this._onStart);
        },
        
        _onStart: function () {
            //  TODO: Make this not as order-dependent
            this.pages = new Pages();

            var bodyView = new BodyView();
            bodyView.render();
            
            this.router = new Router();
        }
    });

    $(function () {
        var streamus = new Application();
        window.Streamus = streamus;
        streamus.start();
    });
});