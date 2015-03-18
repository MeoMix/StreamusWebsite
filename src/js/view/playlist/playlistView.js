define(function(require) {
    'use strict';

    var PlaylistTemplate = require('text!template/playlist.html');
    var PlaylistItemsView = require('view/playlist/playlistItemsView');
    var InstallButtonView = require('view/button/installButtonView');
    var InstallButton = require('model/installButton');
    var SavePlaylistButtonView = require('view/button/savePlaylistButtonView');
    var SavePlaylistButton = require('model/savePlaylistButton');

    var PlaylistView = Marionette.LayoutView.extend({
        template: _.template(PlaylistTemplate),

        regions: {
            playlistItemsRegion: '.playlistItemsRegion',
            buttonRegion: '.buttonRegion'
        },
        
        initialize: function() {
            this.listenTo(Streamus.extensionData, 'change:installed', this._onExtensionDataChangeInstalled);
        },

        onRender: function() {
            this._renderButton(Streamus.extensionData.get('installed'));

            this.playlistItemsRegion.show(new PlaylistItemsView({
                collection: this.model.get('items')
            }));
        },
        
        _onExtensionDataChangeInstalled: function(model, installed) {
            this._renderButton(installed);
        },
        
        _renderButton: function(extensionInstalled) {
            //  The Streamus extension will inject its ID into this webpage if it is installed.
            //  If it is not installed then saving is not possible.
            if (extensionInstalled) {
                this.buttonRegion.show(new SavePlaylistButtonView({
                    model: new SavePlaylistButton({
                        playlistId: this.model.get('id')
                    })
                }));
            } else {
                this.buttonRegion.show(new InstallButtonView({
                    model: new InstallButton()
                }));
            }
        }
    });

    return PlaylistView;
});