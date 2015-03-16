define(function(require) {
    'use strict';

    var PlaylistItemTemplate = require('text!template/playlistItem.html');

    var PlaylistItemView = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: _.template(PlaylistItemTemplate)
    });

    return PlaylistItemView;
});