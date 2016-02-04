import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    // ID is a YouTube Video ID
    id: '',
    title: '',
    author: '',
    // Duration in seconds for the length of the given video.
    duration: -1,
    prettyDuration: '',
    url: ''
  },

  initialize() {
    this._setPrettyDuration(this.get('duration'));
    this._setUrl(this.get('id'));
  },

  _setPrettyDuration(duration) {
    this.set('prettyDuration', this._prettyPrintTime(duration));
  },

  _setUrl(id) {
    this.set('url', `https://youtu.be/${id}`);
  },

  // Takes a time in seconds and converts it to something human-readable in the format of H:mm:ss or mm:ss.
  _prettyPrintTime(timeInSeconds) {
    if (isNaN(timeInSeconds)) {
      timeInSeconds = 0;
    }

    const hours = Math.floor(timeInSeconds / 3600);
    let remainingSeconds = timeInSeconds % 3600;

    let minutes = Math.floor(remainingSeconds / 60);
    remainingSeconds %= 60;

    // Ensure two-digits for small numbers
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (remainingSeconds < 10) {
      remainingSeconds = `0${remainingSeconds}`;
    }

    let timeString = `${minutes}:${remainingSeconds}`;

    if (hours > 0) {
      timeString = `${hours}:${timeString}`;
    }

    return timeString;
  }
});