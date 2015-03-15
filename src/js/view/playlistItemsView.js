define(function (require) {
    'use strict';

    var PlaylistItemView = require('view/playlistItemView');

    var PlaylistItemsView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'list-group',
        childView: PlaylistItemView,
        template: false
    });

    return PlaylistItemsView;
});