define(function(require) {
  'use strict';

  var PlaylistView = require('view/playlist/playlistView');

  var PlaylistsView = Marionette.CollectionView.extend({
    className: 'playlists row',
    template: false,
    childView: PlaylistView
  });

  return PlaylistsView;
});