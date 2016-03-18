import { Model } from 'backbone';
import { result } from 'lodash';

export default Model.extend({
  defaults: {
    isDisabled: false,
    isSaving: false,
    // TODO: Feel like text shouldn't be in the model.
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
    this.set('isDisabled', true);

    App.channels.snackbar.commands.trigger('show:snackbar', {
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
      App.channels.snackbar.commands.trigger('show:snackbar', {
        message: 'Playlist added.'
      });

      this.set({
        isDisabled: true,
        isSaving: false,
        text: 'Playlist added'
      });
    } else {
      App.channels.snackbar.commands.trigger('show:snackbar', {
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