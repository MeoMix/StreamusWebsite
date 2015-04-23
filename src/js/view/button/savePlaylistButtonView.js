define(function(require) {
    'use strict';

    var SavePlaylistButtonTemplate = require('text!template/button/savePlaylistButton.html');
    var Button = require('view/behavior/button');

    var SavePlaylistButtonView = Marionette.ItemView.extend({
        tagName: 'a',
        className: 'savePlaylistButton btn btn-lg btn-success',
        template: _.template(SavePlaylistButtonTemplate),

        behaviors: {
            Button: {
                behaviorClass: Button
            }
        },

        installButton: null,

        initialize: function(options) {
            this.installButton = options.installButton;
            this.listenTo(Streamus.extensionData, 'change:isUserLoaded', this._onExtensionDataChangeIsUserLoaded);
        },

        onClick: function() {
            //  It's better UX to prompt the user to install the extension if needed and then automatically save the playlist rather than making them click twice.
            if (this.installButton.get('enabled')) {
                this.model.set('saveOnInstallSuccess', true);
                //  TODO: Button doesn't say 'Installing...'
                this.installButton.install();
            } else {
                this.model.save();
            }
        },

        _onExtensionDataChangeIsUserLoaded: function(extensionData, isUserLoaded) {
            //  TODO: Could potentially be a long time to wait between install and user loaded.
            if (isUserLoaded && this.model.get('saveOnInstallSuccess')) {
                this.model.beginSaving();
                this.model.save();
            }
        }
    });

    return SavePlaylistButtonView;
});