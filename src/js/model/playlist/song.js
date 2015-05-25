define(function(require) {
  'use strict';

  var Song = Backbone.Model.extend({
    defaults: {
      // ID is a YouTube Video ID
      id: '',
      // Title is immutable. PlaylistItem might support editing the title, but applied to the PlaylistItem and not to Song.
      title: '',
      author: '',
      // Duration in seconds for the length of the given song.
      duration: -1,
      prettyDuration: '',
      url: ''
    },

    initialize: function() {
      this._setPrettyDuration(this.get('duration'));
      this._setUrl(this.get('id'));
    },

    _setPrettyDuration: function(duration) {
      this.set('prettyDuration', this._prettyPrintTime(duration));
    },

    _setUrl: function(id) {
      this.set('url', 'https://youtu.be/' + id);
    },

    // Takes a time in seconds and converts it to something human-readable in the format of H:mm:ss or mm:ss.
    _prettyPrintTime: function(timeInSeconds) {
      if (isNaN(timeInSeconds)) {
        timeInSeconds = 0;
      }

      var hours = Math.floor(timeInSeconds / 3600);
      var remainingSeconds = timeInSeconds % 3600;

      var minutes = Math.floor(remainingSeconds / 60);
      remainingSeconds = remainingSeconds % 60;

      // Ensure two-digits for small numbers
      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
      }

      var timeString = minutes + ':' + remainingSeconds;

      if (hours > 0) {
        timeString = hours + ':' + timeString;
      }

      return timeString;
    }
  });

  return Song;
});