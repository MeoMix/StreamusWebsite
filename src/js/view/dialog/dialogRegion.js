define(function() {
    'use strict';

    var DialogRegion = Marionette.Region.extend({
        initialize: function() {
            this.listenTo(Streamus.channels.dialog.commands, 'show:dialog', this._showDialog);
        },
        
        _showDialog: function (DialogView, options) {
            var dialogView = new DialogView(options);
            this.show(dialogView);
        }
    });

    return DialogRegion;
});