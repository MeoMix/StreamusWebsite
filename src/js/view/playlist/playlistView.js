define(function(require) {
    'use strict';

    var PlaylistTemplate = require('text!template/playlist/playlist.html');
    var PlaylistItemsView = require('view/playlist/playlistItemsView');
    var InstallButtonView = require('view/button/installButtonView');
    var InstallButton = require('model/button/installButton');
    var SavePlaylistButtonView = require('view/button/savePlaylistButtonView');
    var SavePlaylistButton = require('model/button/savePlaylistButton');

    var PlaylistView = Marionette.LayoutView.extend({
        className: 'playlist col-md-offset-2 col-md-8',
        template: _.template(PlaylistTemplate),

        regions: {
            playlistItemsRegion: '.playlistItemsRegion',
            buttonRegion: '.buttonRegion'
        },
        
        ui: {
            loading: '.playlist-loading',
            error: '.playlist-error',
            details: '.playlist-details',
            title: '.playlist-title',
            displayInfo: '.playlist-displayInfo'
        },
        
        initialize: function() {
            this.listenTo(Streamus.extensionData, 'change:installed', this._onExtensionDataChangeInstalled);
            
            //  TODO: This is weird. I know the playlist's ID, but it has not loaded the rest of it's information.
            //  So, I check the title and, if it's empty, I know it has not been loaded yet and should be.
            if (this.model.get('title') === '') {
                this.model.fetch({
                    success: this._onPlaylistFetchSuccess.bind(this),
                    error: this._onPlaylistFetchError.bind(this)
                });
            }
        },

        onRender: function() {
            this._setTitle(this.model.get('title'));
            this._setDisplayInfo(this.model.get('items').getDisplayInfo());
            this._renderButton(Streamus.extensionData.get('installed'));

            this.playlistItemsRegion.show(new PlaylistItemsView({
                collection: this.model.get('items')
            }));
        },
        
        _onChangeTitle: function(model, title) {
            this._setTitle(title);
        },
        
        _onPlaylistFetchSuccess: function(model) {
            this._setTitle(model.get('title'));
            this._setDisplayInfo(model.get('items').getDisplayInfo());

            this.ui.loading.addClass('is-hidden');
            this.ui.details.removeClass('is-hidden');
        },
        
        _onPlaylistFetchError: function() {
            this.ui.loading.addClass('is-hidden');
            this.ui.error.removeClass('is-hidden');
        },

        _onExtensionDataChangeInstalled: function(model, installed) {
            this._renderButton(installed);
        },
        
        _setTitle: function(title) {
            this.ui.title.text(title);
        },
        
        _setDisplayInfo: function(displayInfo) {
            this.ui.displayInfo.text(displayInfo);
        },

        _renderButton: function(extensionInstalled) {
            //  The Streamus extension will inject its ID into this webpage if it is installed.
            //  If it is not installed then saving is not possible. So, prompt the user to install.
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