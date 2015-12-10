import { Model, Collection } from 'backbone';
import _ from 'lodash';
import PlaylistItems from './playlistItems';
// Polyfill is needed for Reflect API
import 'babel/polyfill';

// Playlist holds a collection of PlaylistItems as well as properties pertaining to a playlist.
export default Model.extend({
  defaults: {
    id: null,
    userId: null,
    title: '',
    items: null,
    sequence: -1
  },

  urlRoot() {
    return `${App.serverUrl}Playlist/`;
  },

  // Convert data which is sent from the server back to a proper Backbone.Model.
  // Need to recreate submodels as Backbone.Models else they will just be regular Objects.
  parse(playlistDto) {
    // Patch requests do not return information.
    if (!_.isUndefined(playlistDto)) {
      // Convert C# Guid.Empty into BackboneJS null
      playlistDto = _.mapValues(playlistDto, (value) => {
        return value === '00000000-0000-0000-0000-000000000000' ? null : value;
      });

      // Reset will load the server's response into items as a Backbone.Collection
      this.get('items').reset(playlistDto.items);
      this.get('items').playlistId = playlistDto.id;

      // Remove so parse doesn't set and overwrite instance after parse returns.
      Reflect.deleteProperty(playlistDto, 'items');
    }

    return playlistDto;
  },

  initialize() {
    this._ensureItemsCollection();
  },

  _ensureItemsCollection() {
    const items = this.get('items');

    // Need to convert items array to Backbone.Collection
    if (!(items instanceof Collection)) {
      // Silent because items is just being properly set.
      this.set('items', new PlaylistItems(items, {
        playlistId: this.get('id')
      }), {
        silent: true
      });
    }
  }
});