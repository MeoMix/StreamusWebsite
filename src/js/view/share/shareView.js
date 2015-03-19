define(function(require) {
    'use strict';

    var Playlist = require('model/playlist');
    var PlaylistView = require('view/playlist/playlistView');
    var ShareTemplate = require('text!template/share.html');

    var ShareView = Marionette.LayoutView.extend({
        template: _.template(ShareTemplate),

        regions: {
            playlistRegion: '.playlistRegion'
        },

        ui: {
            error: '.error',
            loading: '.loading'
        },

        shareCode: null,

        initialize: function(options) {
            this.shareCode = options && !_.isUndefined(options.shareCode) ? options.shareCode : this.shareCode;
        },

        onRender: function() {
            //  If the view was initialized with a ShareCode then go ahead and load it.
            //  Otherwise, just let the user know no ShareCode is present and they can act accordingly.
            if (this.shareCode !== null) {
                this._loadEntity(this.shareCode);
            }
        },

        _loadEntity: function(shareCode) {
            //  Figure out the actual entity ID from the ShareCode by asking the server for more information.
            shareCode.fetchByShortIdAndEntityTitle({
                success: this._onShareCodeFetchSuccess.bind(this),
                error: this._onShareCodeFetchError.bind(this)
            });

            this.ui.loading.removeClass('is-hidden');
        },

        _onShareCodeFetchSuccess: function(model) {
            //  Currently, only playlists can be shared. In the future, this will need to be modified to support other shareable entity types.
            var playlist = new Playlist({
                id: model.get('entityId')
            });

            //  Figure out the entity's contents after learning its id.
            playlist.fetch({
                success: this._onPlaylistFetchSuccess.bind(this),
                error: this._onPlaylistFetchError.bind(this)
            });
        },

        //  Present the entity's contents to the user.
        _onPlaylistFetchSuccess: function(model) {
            var playlistView = new PlaylistView({
                model: model
            });

            this.playlistRegion.show(playlistView);
            this.ui.loading.addClass('is-hidden');
        },

        _onShareCodeFetchError: function() {
            this._showError();
        },

        _onPlaylistFetchError: function() {
            this._showError();
        },

        _showError: function() {
            this.ui.loading.addClass('is-hidden');
            this.ui.error.removeClass('is-hidden');
        },
    });

    return ShareView;
});