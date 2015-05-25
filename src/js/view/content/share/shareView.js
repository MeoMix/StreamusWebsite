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
      // If the view was initialized with a ShareCode then go ahead and load it.
      // Otherwise, just let the user know no ShareCode is present and they can act accordingly.
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

      // Figure out the actual entity ID from the ShareCode by asking the server for more information.
      shareCode.fetchByShortIdAndEntityTitle({
        success: this._onShareCodeFetchSuccess.bind(this),
        error: this._onShareCodeFetchError.bind(this)
      });
    },

    _onShareCodeFetchSuccess: function(model) {
      this.ui.loading.addClass('is-hidden');

      // Currently, only playlists can be shared.
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