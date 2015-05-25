define(function(require) {
  'use strict';

  var PlaylistItemTemplate = require('text!template/playlist/playlistItem.html');

  var PlaylistItemView = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'playlistItem list-group-item',
    template: _.template(PlaylistItemTemplate)
  });

  return PlaylistItemView;
});