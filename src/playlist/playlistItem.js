import { Model } from 'backbone';
import Video from './video.js';
import { mapValues } from 'lodash';
export default Model.extend({
  defaults: {
    id: null,
    playlistId: null,
    sequence: -1,
    video: null
  },

  parse(playlistItemDto) {
    // Patch requests do not return information.
    if (playlistItemDto) {
      // Convert C# Guid.Empty into BackboneJS null
      playlistItemDto = mapValues(playlistItemDto, (value) => {
        return value === '00000000-0000-0000-0000-000000000000' ? null : value;
      });

      // Take json of video and set into model. Delete to prevent overriding on return of data object.
      this.get('video').set(playlistItemDto.video);
      delete playlistItemDto.video;
    }

    return playlistItemDto;
  },

  initialize() {
    this._ensureVideoModel();
  },

  _ensureVideoModel() {
    const video = this.get('video');

    // Need to convert video object to Backbone.Model
    if (!(video instanceof Model)) {
      // Silent because video is just being properly set.
      this.set('video', new Video(video), {
        silent: true
      });
    }
  }
});