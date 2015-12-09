import { Collection } from 'backbone';
import _ from 'lodash';
import PlaylistItem from './playlistItem';

export default Collection.extend({
  comparator: 'sequence',
  model: PlaylistItem,

  // Convert total duration of the collection's models to a user friendly format.
  getDisplayInfo() {
    const totalItemsDuration = this._getTotalDuration();
    const prettyTimeWithWords = this._prettyPrintTimeWithWords(totalItemsDuration);

    const songs = this.pluck('song');
    const songString = songs.length === 1 ? 'song' : 'songs';

    const displayInfo = `${songs.length} ${songString}, ${prettyTimeWithWords}`;
    return displayInfo;
  },

  _getTotalDuration() {
    const songDurations = _.invoke(this.pluck('song'), 'get', 'duration');

    const totalDuration = _.reduce(songDurations, (memo, songDuration) => {
      return memo + songDuration;
    }, 0);

    return totalDuration;
  },

  // Similar to prettyPrintTime, but incorporates "days" "hours" "minutes" instead of just using numbers.
  _prettyPrintTimeWithWords(timeInSeconds) {
    let prettyTime;
    const timeInMinutes = Math.floor(timeInSeconds / 60);

    // Print the total duration of content in minutes unless there is 3+ hours, then just print hours.
    if (timeInMinutes === 1) {
      prettyTime = `${timeInMinutes} minute`;
    } else if (timeInMinutes > 4320) {
      prettyTime = `${Math.floor(timeInMinutes / 1440)} days`;
    } else if (timeInMinutes > 180) {
      prettyTime = `${Math.floor(timeInMinutes / 60)} hours`;
    } else {
      prettyTime = `${timeInMinutes} minutes`;
    }

    return prettyTime;
  }
});