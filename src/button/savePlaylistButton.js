import { Model } from 'backbone';
import { result } from 'lodash';

export default Model.extend({
  defaults: {
    isEnabled: true,
    isSaving: false,
    text: 'Add Playlist',
    playlistId: null,
    isSavePending: false
  },

  initialize() {
    this.listenTo(App.extensionData, 'change:isUserLoaded', this._onExtensionDataChangeIsUserLoaded);
  },

  reset() {
    this.set(result(this, 'defaults'));
  },

  save() {
    this.set({
      isEnabled: false,
      text: 'Saving...'
    });

    App.channels.notification.commands.trigger('show:notification', {
      message: 'Adding playlist.'
    });

    window.chrome.runtime.sendMessage(App.extensionData.get('id'), {
      method: 'copyPlaylist',
      playlistId: this.get('playlistId')
    }, this._onSendMessageResponse.bind(this));
  },

  _onSendMessageResponse(response) {
    const success = response.result === 'success';

    if (success) {
      App.channels.notification.commands.trigger('show:notification', {
        message: 'Playlist added.'
      });

      this.set({
        isEnabled: false,
        isSaving: false,
        text: 'Playlist added'
      });
    } else {
      App.channels.notification.commands.trigger('show:notification', {
        message: 'Failed to add playlist.'
      });

      this.reset();
    }

    const eventName = success ? 'AddedSuccess' : 'AddedError';
    App.analyticsManager.trackEvent('Playlist', eventName, this.get('playlistId'));
  },

  _onExtensionDataChangeIsUserLoaded(extensionData, isUserLoaded) {
    // TODO: Could potentially be a long time to wait between install and user loaded.
    if (isUserLoaded && this.get('isSavePending')) {
      this.save();
    }
  }
});