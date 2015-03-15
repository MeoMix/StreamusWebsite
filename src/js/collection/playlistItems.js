define(function (require) {
    'use strict';

    var PlaylistItem = require('model/playlistItem');
    var Utility = require('utility');

    var PlaylistItems = Backbone.Collection.extend({
        model: PlaylistItem,

        getDisplayInfo: function () {
            var totalItemsDuration = this._getTotalDuration();
            var prettyTimeWithWords = Utility.prettyPrintTimeWithWords(totalItemsDuration);

            var songs = this.pluck('song');
            var songString = chrome.i18n.getMessage(songs.length === 1 ? 'song' : 'songs');

            var displayInfo = songs.length + ' ' + songString + ', ' + prettyTimeWithWords;
            return displayInfo;
        },

        _getTotalDuration: function () {
            var songDurations = _.invoke(this.pluck('song'), 'get', 'duration');

            var totalDuration = _.reduce(songDurations, function (memo, songDuration) {
                return memo + songDuration;
            }, 0);

            return totalDuration;
        }
    });

    return PlaylistItems;
});