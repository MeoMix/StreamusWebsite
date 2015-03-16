define(function(require) {
    'use strict';

    var Page = require('model/page');
    var Route = require('enum/route');
    var HomePageView = require('view/page/home/homePageView');

    var HomePageRegion = Marionette.Region.extend({
        initialize: function() {
            this.listenTo(Streamus.channels.body.vent, 'rendered', this._onBodyRendered);
        },

        _onBodyRendered: function() {
            var homePageView = new HomePageView({
                model: new Page({
                    route: Route.Home
                })
            });
            homePageView.render();
        }
    });

    return HomePageRegion;
});