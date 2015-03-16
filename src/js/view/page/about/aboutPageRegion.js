define(function(require) {
    'use strict';

    var Page = require('model/page');
    var Route = require('enum/route');
    var AboutPageView = require('view/page/about/aboutPageView');

    var AboutPageRegion = Marionette.Region.extend({
        initialize: function() {
            this.listenTo(Streamus.channels.body.vent, 'rendered', this._onBodyRendered);
        },

        _onBodyRendered: function() {
            var aboutPageView = new AboutPageView({
                model: new Page({
                    route: Route.About
                })
            });
            aboutPageView.render();
        }
    });

    return AboutPageRegion;
});