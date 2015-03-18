define(function() {
    'use strict';

    var SavePlaylistButton = Backbone.Model.extend({
        defaults: {
            enabled: true,
            text: 'Add to Streamus',
            playlistId: ''
        },
        
        reset: function() {
            this.set(this.defaults);
        }
    });

    return SavePlaylistButton;
});