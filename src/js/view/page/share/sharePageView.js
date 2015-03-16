define(function(require) {
    'use strict';

    var Routable = require('view/behavior/routable');
    var ShareCode = require('model/shareCode');
    var Playlist = require('model/playlist');
    var PlaylistView = require('view/page/share/playlistView');

    var SharePageView = Marionette.LayoutView.extend({
        el: '.sharePage',
        template: false,

        regions: {
            playlistRegion: '.playlistRegion'
        },

        behaviors: function() {
            return {
                Routable: {
                    behaviorClass: Routable
                }
            };
        },

        initialize: function() {
            this.listenTo(Streamus.channels.share.commands, 'load:entity', this._loadEntity);
        },

        _loadEntity: function(options) {
            //  TODO: Actually use an entityType enum
            if (options.entityType === 'playlist') {
                var shareCode = new ShareCode({
                    shortId: options.shortId,
                    urlFriendlyEntityTitle: options.urlFriendlyEntityTitle,
                });

                shareCode.fetchByShortIdAndEntityTitle({
                    success: this._onShareCodeFetchSuccess.bind(this),
                    error: this._onShareCodeFetchError.bind(this)
                });
            }
        },

        _onShareCodeFetchSuccess: function(model) {
            //  NOTE: No need to check entity here... but in the future if supporting other entities (folders, etc.) then it would be a good idea.
            var playlist = new Playlist({
                id: model.get('entityId')
            });

            playlist.fetch({
                success: this._onPlaylistFetchSuccess.bind(this),
                error: this._onPlaylistFetchError.bind(this)
            });
        },

        _onPlaylistFetchSuccess: function(model) {
            //  TODO: I think it's probably better UX to show view with a 'loading' indicator instead of creating it on fetch success.
            var playlistView = new PlaylistView({
                model: model
            });

            this.playlistRegion.show(playlistView);
        },

        _onShareCodeFetchError: function() {
            //  TODO: Notify user an error was encountered.
            console.error('An error was encountered');
        },

        _onPlaylistFetchError: function() {
            //  TODO: Notify user an error was encountered.
            console.error('An error was encountered');
        }
    });

    return SharePageView;
});