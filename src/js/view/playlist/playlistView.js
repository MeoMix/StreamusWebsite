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
      // TODO: This is weird. I know the playlist's ID, but it has not loaded the rest of it's information.
      // So, I check the title and, if it's empty, I know it has not been loaded yet and should be.
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
      this._renderButton();

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

    _setTitle: function(title) {
      this.ui.title.text(title);
    },

    _setDisplayInfo: function(displayInfo) {
      this.ui.displayInfo.text(displayInfo);
    },

    _renderButton: function() {
      this.buttonRegion.show(new SavePlaylistButtonView({
        model: new SavePlaylistButton({
          playlistId: this.model.get('id')
        }),
        // TODO: Rename 'button' models to 'action' to ensure they aren't coupled to a given view.
        installButton: new InstallButton()
      }));
    }
  });

  return PlaylistView;
});