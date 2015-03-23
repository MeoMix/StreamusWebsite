define(function(require) {
    'use strict';

    var PlaylistItemView = require('view/playlist/playlistItemView');

    var PlaylistItemsView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'list-group playlistItems',
        childView: PlaylistItemView,
        template: false
    });

    return PlaylistItemsView;
});