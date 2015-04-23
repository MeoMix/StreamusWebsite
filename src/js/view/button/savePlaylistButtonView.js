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
            this.listenTo(Streamus.extensionData, 'change:installed', this._onExtensionDataChangeInstalled);
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

        _onExtensionDataChangeInstalled: function(extensionData, installed) {
            if (installed && this.model.get('saveOnInstallSuccess')) {
                this.model.set('saveOnInstallSuccess', false);
                this.model.beginSaving();

                //  TODO: Have the extension emit an 'onReady' event so that I know when I can actually save rather than waiting.
                //  It's a lot harder to do than it would seem, though, because the extension's code loads asynchronously and there's no easy way
                //  to know when I can save.
                setTimeout(function() {
                    this.model.save();
                }.bind(this), 3000);
            }
        }
    });

    return SavePlaylistButtonView;
});