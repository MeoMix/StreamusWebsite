define(function(require) {
    'use strict';

    var PlaylistTemplate = require('text!template/playlist.html');
    var PlaylistItemsView = require('view/playlistItemsView');

    var PlaylistView = Marionette.LayoutView.extend({
        template: _.template(PlaylistTemplate),

        regions: {
            playlistItemsRegion: '.playlistItemsRegion'
        },

        ui: {
            save: '.save'
        },

        events: {
            'click @ui.save': '_onClickSave'
        },

        onRender: function() {
            var playlistItemsView = new PlaylistItemsView({
                collection: this.model.get('items')
            });

            this.playlistItemsRegion.show(playlistItemsView);
        },

        _onClickSave: function() {
            //  TODO: Need to inject extension ID instead
            chrome.runtime.sendMessage('jbnkffmindojffecdhbbmekbmkkfpmjd', {
                method: 'copyPlaylist',
                playlistId: this.model.get('id')
            }, function(response) {

            });
        }
    });

    return PlaylistView;
});