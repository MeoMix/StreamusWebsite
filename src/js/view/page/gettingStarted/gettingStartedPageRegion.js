define(function(require) {
    'use strict';

    var Page = require('model/page');
    var Route = require('enum/route');
    var GettingStartedPageView = require('view/page/gettingStarted/gettingStartedPageView');

    var GettingStartedPageRegion = Marionette.Region.extend({
        initialize: function() {
            this.listenTo(Streamus.channels.body.vent, 'rendered', this._onBodyRendered);
        },

        _onBodyRendered: function() {
            this.show(new GettingStartedPageView({
                model: new Page({
                    route: Route.GettingStarted
                })
            }));
        }
    });

    return GettingStartedPageRegion;
});