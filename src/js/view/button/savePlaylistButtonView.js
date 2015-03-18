define(function(require) {
    'use strict';

    var SavePlaylistButtonTemplate = require('text!template/savePlaylistButton.html');
    var Button = require('view/behavior/button');
    
    var SavePlaylistButtonView = Marionette.ItemView.extend({
        tagName: 'a',
        className: 'savePlaylistButton btn btn-success',
        template: _.template(SavePlaylistButtonTemplate),
        
        events: {
            'click': '_onClick'
        },
        
        behaviors: {
            Button: {
                behaviorClass: Button
            }
        },
        
        _onClick: function() {
            if (!this.model.get('disabled')) {
                this.model.set({
                    enabled: false,
                    text: 'Saving...'
                });

                chrome.runtime.sendMessage(Streamus.extensionData.get('id'), {
                    method: 'copyPlaylist',
                    playlistId: this.model.get('playlistId')
                }, this._onSendMessageResponse.bind(this));
            }
        },
        
        _onSendMessageResponse: function(response) {
            if (response.result === 'success') {
                this.model.set('text', 'Playlist added');
            } else {
                this.model.reset();
            }
        }
    });

    return SavePlaylistButtonView;
});