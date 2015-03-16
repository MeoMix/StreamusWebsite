define(function(require) {
    'use strict';

    var FooterView = require('view/footer/footerView');

    var FooterRegion = Marionette.Region.extend({
        initialize: function() {
            this.listenTo(Streamus.channels.body.vent, 'rendered', this._onBodyRendered);
        },

        _onBodyRendered: function() {
            var footerView = new FooterView();
            footerView.render();
        }
    });

    return FooterRegion;
});