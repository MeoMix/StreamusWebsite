import { Collection } from 'backbone';
import PlaylistItem from './playlistItem.js';
import { invoke, reduce } from 'lodash';

export default Collection.extend({
  comparator: 'sequence',
  model: PlaylistItem,

  // Convert total duration of the collection's models to a user friendly format.
  getDisplayInfo() {
    const totalDuration = this._getTotalDuration();
    const prettyTimeWithWords = this._prettyPrintTimeWithWords(totalDuration);

    const videos = this.pluck('video');
    const videoString = videos.length === 1 ? 'video' : 'videos';

    return `${videos.length} ${videoString}, ${prettyTimeWithWords}`;
  },

  _getTotalDuration() {
    const videoDurations = invoke(this.pluck('video'), 'get', 'duration');

    const totalDuration = reduce(videoDurations, (memo, videoDuration) => {
      return memo + videoDuration;
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