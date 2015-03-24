define(function(require) {
    'use strict';

    var PlaylistItem = require('model/playlist/playlistItem');

    var PlaylistItems = Backbone.Collection.extend({
        comparator: 'sequence',
        model: PlaylistItem,

        //  Convert total duration of the collection's models to a user friendly format.
        getDisplayInfo: function() {
            var totalItemsDuration = this._getTotalDuration();
            var prettyTimeWithWords = this._prettyPrintTimeWithWords(totalItemsDuration);

            var songs = this.pluck('song');
            var songString = songs.length === 1 ? 'song' : 'songs';

            var displayInfo = songs.length + ' ' + songString + ', ' + prettyTimeWithWords;
            return displayInfo;
        },

        _getTotalDuration: function() {
            var songDurations = _.invoke(this.pluck('song'), 'get', 'duration');

            var totalDuration = _.reduce(songDurations, function(memo, songDuration) {
                return memo + songDuration;
            }, 0);

            return totalDuration;
        },
        
        //  Similar to prettyPrintTime, but incorporates "days" "hours" "minutes" into the end result instead of just using numbers.
        _prettyPrintTimeWithWords: function(timeInSeconds) {
            var prettyTime;
            var timeInMinutes = Math.floor(timeInSeconds / 60);

            //  Print the total duration of content in minutes unless there is 3+ hours, then just print hours.
            if (timeInMinutes === 1) {
                prettyTime = timeInMinutes + ' minute';
            } else if (timeInMinutes > 4320) {
                prettyTime = Math.floor(timeInMinutes / 1440) + ' days';
            } else if (timeInMinutes > 180) {
                prettyTime = Math.floor(timeInMinutes / 60) + ' hours';
            } else {
                prettyTime = timeInMinutes + ' minutes';
            }

            return prettyTime;
        }
    });

    return PlaylistItems;
});