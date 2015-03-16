define(function(require) {
    'use strict';

    var Song = require('model/song');

    var PlaylistItem = Backbone.Model.extend({
        defaults: {
            id: null,
            playlistId: null,
            sequence: -1,
            title: '',
            song: null
        },

        parse: function(playlistItemDto) {
            //  Patch requests do not return information.
            if (!_.isUndefined(playlistItemDto)) {
                //  Convert C# Guid.Empty into BackboneJS null
                for (var key in playlistItemDto) {
                    if (playlistItemDto.hasOwnProperty(key) && playlistItemDto[key] === '00000000-0000-0000-0000-000000000000') {
                        playlistItemDto[key] = null;
                    }
                }

                // Take json of song and set into model. Delete to prevent overriding on return of data object.
                this.get('song').set(playlistItemDto.song);
                delete playlistItemDto.song;
            }

            return playlistItemDto;
        },

        initialize: function() {
            this._ensureSongModel();
        },

        _ensureSongModel: function() {
            var song = this.get('song');

            //  Need to convert song object to Backbone.Model
            if (!(song instanceof Backbone.Model)) {
                //  Silent because song is just being properly set.
                this.set('song', new Song(song), {
                    silent: true
                });
            }
        }
    });

    return PlaylistItem;
});