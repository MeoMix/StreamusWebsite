define(function(require) {
    'use strict';

    var Playlist = require('model/playlist/playlist');

    var Playlists = Backbone.Collection.extend({
        model: Playlist
    });

    return Playlists;
});