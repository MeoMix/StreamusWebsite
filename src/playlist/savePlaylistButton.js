import { Model } from 'backbone';

export default Model.extend({
  defaults() {
    const isDisabled = !App.extension.get('isInstalled') && !App.extension.get('canInstall');

    return {
      isDisabled,
      text: isDisabled ? App.extension.get('cantInstallReason') : 'Add Playlist',
      playlistId: null
    };
  },

  save() {
    this.set('isDisabled', true);

    // Prompt the user to install if needed and then automatically save the playlist.
    // This is better UX compared to making the user click twice.
    if (App.extension.get('canInstall')) {
      App.extension.install().then(() => {
        // TODO: I need to check for isUserLoaded.
        this._save();
      }).catch(() => {
        this.model.set('isDisabled', false);
      });
    } else {
      this._save();
    }
  },

  _save() {
    App.channels.snackbar.trigger('show:snackbar', {
      message: 'Adding playlist.'
    });

    App.extension.sendMessage({
      method: 'copyPlaylist',
      playlistId: this.get('playlistId')
    }).then(this._onPlaylistAddSuccess.bind(this), this._onPlaylistAddFailure.bind(this));
  },

  // Notify user and analytics that added the playlist succeeded.
  // Don't re-enable the button; change its text to indicate playlist was added.
  _onPlaylistAddSuccess() {
    App.channels.snackbar.trigger('show:snackbar', {
      message: 'Playlist added.'
    });

    this.set('text', 'Playlist added');

    App.analyticsManager.trackEvent('Playlist', 'AddedSuccess', this.get('playlistId'));
  },

  // Notify user and analytics that adding the playlist failed.
  // Reset save button so that user may try again (could be an intermittent save issue).
  _onPlaylistAddFailure() {
    App.channels.snackbar.trigger('show:snackbar', {
      message: 'Failed to add playlist.'
    });

    this.set({
      isDisabled: false,
      // TODO: Not DRY with text in defaults
      text: 'Add Playlist'
    });

    App.analyticsManager.trackEvent('Playlist', 'AddedError', this.get('playlistId'));
  }
});