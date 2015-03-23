define(function(require) {
    'use strict';

    var Playlists = require('collection/playlists');
    var PlaylistsView = require('view/playlist/playlistsView');
    var ShareTemplate = require('text!template/content/share.html');
    var RouteType = require('enum/routeType');
    var Updatable = require('view/behavior/updatable');

    var ShareView = Marionette.LayoutView.extend({
        className: 'share content',
        template: _.template(ShareTemplate),
        templateHelpers: {
            shareRouteType: RouteType.Share
        },

        regions: {
            playlistsRegion: '.playlistsRegion'
        },

        ui: {
            error: '.share-error',
            loading: '.share-loading',
            introduction: '.share-introduction'
        },

        modelEvents: {
            'change:shareCode': '_onChangeShareCode'
        },

        behaviors: {
            Updatable: {
                behaviorClass: Updatable
            }
        },

        onRender: function() {
            //  If the view was initialized with a ShareCode then go ahead and load it.
            //  Otherwise, just let the user know no ShareCode is present and they can act accordingly.
            var shareCode = this.model.get('shareCode');

            if (shareCode === null) {
                this._showIntroduction();
            } else {
                this._loadEntity(shareCode);
            }
        },

        _onChangeShareCode: function() {
            this.render();
        },

        _showIntroduction: function() {
            this.ui.introduction.removeClass('is-hidden');
        },

        _loadEntity: function(shareCode) {
            this.ui.introduction.addClass('is-hidden');
            this.ui.loading.removeClass('is-hidden');
            
            //  TODO: It would be nice not to hard-code this, but I don't have a great system in place for 'special' playlists just yet.
            //  Instead of using just 1 share code, I'll just fetch the playlists by hardcoded IDs.
            if (shareCode.get('shortId') === 'coachella') {
                this._fetchCoachellaPlaylists();
            } else {
                //  Figure out the actual entity ID from the ShareCode by asking the server for more information.
                shareCode.fetchByShortIdAndEntityTitle({
                    success: this._onShareCodeFetchSuccess.bind(this),
                    error: this._onShareCodeFetchError.bind(this)
                });
            }
        },
        
        _fetchCoachellaPlaylists: function() {
            this.ui.loading.addClass('is-hidden');
            //  Coachella Friday, Saturday, and Sunday playlists.
            this._showPlaylists(['E9B725F7-EF8C-49BB-8F80-A462016BA72F', 'DA54345F-E117-4B44-AF39-A462016BAD74', '6B091508-7276-4591-A376-A462016BB178']);
        },

        _onShareCodeFetchSuccess: function(model) {
            this.ui.loading.addClass('is-hidden');

            //  Currently, only playlists can be shared. In the future, this will need to be modified to support other shareable entity types.
            this._showPlaylists([model.get('entityId')]);
        },
        
        _showPlaylists: function(playlistIds) {
            var playlists = new Playlists(_.map(playlistIds, function(playlistId) {
                return {
                    id: playlistId
                };
            }));

            var playlistsView = new PlaylistsView({
                collection: playlists
            });

            this.playlistsRegion.show(playlistsView);
        },

        _onShareCodeFetchError: function() {
            this.ui.loading.addClass('is-hidden');
            this.ui.error.removeClass('is-hidden');
        }
    });

    return ShareView;
});