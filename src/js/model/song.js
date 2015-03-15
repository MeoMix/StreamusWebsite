define(function (require) {
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

            //  These are calculated:
            prettyDuration: '',
            url: ''
        },

        initialize: function () {
            this._setPrettyDuration(this.get('duration'));
            this._setUrl(this.get('id'));
        },

        //  Calculate this value pre-emptively because when rendering I don't want to incur inefficiency
        _setPrettyDuration: function (duration) {
            this.set('prettyDuration', Utility.prettyPrintTime(duration));
        },

        _setUrl: function (id) {
            this.set('url', 'https://youtu.be/' + id);
        }
    });

    return Song;
});