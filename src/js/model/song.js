define(function(require) {
    'use strict';

    var Utility = require('utility');

    var Song = Backbone.Model.extend({
        defaults: {
            //  ID is a YouTube Video ID
            id: '',
            //  Title is immutable. PlaylistItem might support editing the title, but applied to the PlaylistItem and not to Song.
            title: '',
            author: '',
            //  Duration in seconds for the length of the given song.
            duration: -1,
            prettyDuration: '',
            url: ''
        },

        initialize: function() {
            this._setPrettyDuration(this.get('duration'));
            this._setUrl(this.get('id'));
        },

        _setPrettyDuration: function(duration) {
            this.set('prettyDuration', Utility.prettyPrintTime(duration));
        },

        _setUrl: function(id) {
            this.set('url', 'https://youtu.be/' + id);
        }
    });

    return Song;
});