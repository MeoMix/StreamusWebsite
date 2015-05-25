define(function() {
  'use strict';

  var SavePlaylistButton = Backbone.Model.extend({
    defaults: {
      enabled: true,
      text: 'Add to Streamus',
      playlistId: '',
      saveOnInstallSuccess: false
    },

    reset: function() {
      this.set(this.defaults);
    },

    beginSaving: function() {
      this.set({
        enabled: false,
        text: 'Saving...'
      });
    },

    save: function() {
      this.beginSaving();

      chrome.runtime.sendMessage(Streamus.extensionData.get('id'), {
        method: 'copyPlaylist',
        playlistId: this.get('playlistId')
      }, this._onSendMessageResponse.bind(this));
    },

    _onSendMessageResponse: function(response) {
      var success = response.result === 'success';

      if (success) {
        this.set('text', 'Playlist added');
      } else {
        this.reset();
      }

      var eventName = success ? 'AddedSuccess' : 'AddedError';
      Streamus.analyticsManager.trackEvent('Playlist', eventName, this.get('playlistId'));
    }
  });

  return SavePlaylistButton;
});