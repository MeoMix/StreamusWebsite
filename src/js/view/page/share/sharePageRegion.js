define(function(require) {
    'use strict';

    var Page = require('model/page');
    var Route = require('enum/route');
    var SharePageView = require('view/page/share/sharePageView');

    var SharePageRegion = Marionette.Region.extend({
        initialize: function() {
            this.listenTo(Streamus.channels.body.vent, 'rendered', this._onBodyRendered);
        },

        _onBodyRendered: function() {
            var sharePageView = new SharePageView({
                model: new Page({
                    route: Route.Share
                })
            });
            sharePageView.render();
        }
    });

    return SharePageRegion;
});