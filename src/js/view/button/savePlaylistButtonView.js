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

        onClick: function() {
            this.model.set({
                enabled: false,
                text: 'Saving...'
            });

            chrome.runtime.sendMessage(Streamus.extensionData.get('id'), {
                method: 'copyPlaylist',
                playlistId: this.model.get('playlistId')
            }, this._onSendMessageResponse.bind(this));
        },

        _onSendMessageResponse: function(response) {
            if (response.result === 'success') {
                this.model.set('text', 'Playlist added');
                Streamus.analyticsManager.trackEvent('Playlist', 'AddedSuccess', this.model.get('playlistId'));
            } else {
                Streamus.analyticsManager.trackEvent('Playlist', 'AddedError', this.model.get('playlistId'));
                this.model.reset();
            }
        }
    });

    return SavePlaylistButtonView;
});