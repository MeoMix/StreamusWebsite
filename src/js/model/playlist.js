define(function (require) {
    'use strict';

    var PlaylistItems = require('collection/playlistItems');

    //  Playlist holds a collection of PlaylistItems as well as properties pertaining to a playlist.
    var Playlist = Backbone.Model.extend({
        defaults: {
            id: null,
            userId: null,
            title: '',
            items: null,
            sequence: -1
        },
        
        urlRoot: function () {
            return Streamus.serverUrl + 'Playlist/';
        },
        
        //  Convert data which is sent from the server back to a proper Backbone.Model.
        //  Need to recreate submodels as Backbone.Models else they will just be regular Objects.
        parse: function (playlistDto) {
            //  Convert C# Guid.Empty into BackboneJS null
            for (var key in playlistDto) {
                if (playlistDto.hasOwnProperty(key) && playlistDto[key] === '00000000-0000-0000-0000-000000000000') {
                    playlistDto[key] = null;
                }
            }

            //  Reset will load the server's response into items as a Backbone.Collection
            this.get('items').reset(playlistDto.items);
            this.get('items').playlistId = playlistDto.id;

            // Remove so parse doesn't set and overwrite instance after parse returns.
            delete playlistDto.items;

            return playlistDto;
        },

        initialize: function () {
            this._ensureItemsCollection();
        },

        _ensureItemsCollection: function () {
            var items = this.get('items');

            //  Need to convert items array to Backbone.Collection
            if (!(items instanceof Backbone.Collection)) {
                //  Silent because items is just being properly set.
                this.set('items', new PlaylistItems(items, {
                    playlistId: this.get('id')
                }), {
                    silent: true
                });
            }
        }
    });

    return Playlist;
});