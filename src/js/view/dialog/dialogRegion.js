define(function() {
    'use strict';

    var DialogRegion = Marionette.Region.extend({
        initialize: function() {
            this.listenTo(Streamus.channels.dialog.commands, 'show:dialog', this._showDialog);
        },

        _showDialog: function(DialogView, options) {
            this.show(new DialogView(options));
        }
    });

    return DialogRegion;
});