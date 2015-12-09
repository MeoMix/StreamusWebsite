import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    enabled: true,
    text: 'Add to Streamus',
    playlistId: '',
    saveOnInstallSuccess: false
  },

  reset() {
    this.set(this.defaults);
  },

  beginSaving() {
    this.set({
      enabled: false,
      text: 'Saving...'
    });
  },

  save() {
    this.beginSaving();

    window.chrome.runtime.sendMessage(App.extensionData.get('id'), {
      method: 'copyPlaylist',
      playlistId: this.get('playlistId')
    }, this._onSendMessageResponse.bind(this));
  },

  _onSendMessageResponse(response) {
    const success = response.result === 'success';

    if (success) {
      this.set('text', 'Playlist added');
    } else {
      this.reset();
    }

    const eventName = success ? 'AddedSuccess' : 'AddedError';
    App.analyticsManager.trackEvent('Playlist', eventName, this.get('playlistId'));
  }
});