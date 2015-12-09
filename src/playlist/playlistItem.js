import { Model } from 'backbone';
import _ from 'lodash';
import Song from './song';
// Polyfill is needed for Reflect API
//import 'babel/polyfill';

export default Model.extend({
  defaults: {
    id: null,
    playlistId: null,
    sequence: -1,
    title: '',
    song: null
  },

  parse(playlistItemDto) {
    // Patch requests do not return information.
    if (!_.isUndefined(playlistItemDto)) {
      // Convert C# Guid.Empty into BackboneJS null
      playlistItemDto = _.mapValues(playlistItemDto, (value) => {
        return value === '00000000-0000-0000-0000-000000000000' ? null : value;
      });

      // Take json of song and set into model. Delete to prevent overriding on return of data object.
      this.get('song').set(playlistItemDto.song);
      //Reflect.deleteProperty(playlistItemDto, 'song');
    }

    return playlistItemDto;
  },

  initialize() {
    this._ensureSongModel();
  },

  _ensureSongModel() {
    const song = this.get('song');

    // Need to convert song object to Backbone.Model
    if (!(song instanceof Model)) {
      // Silent because song is just being properly set.
      this.set('song', new Song(song), {
        silent: true
      });
    }
  }
});