import { LayoutView } from 'marionette';
import template from './savePlaylistButton.hbs!';
import Button from 'behavior/button';

export default LayoutView.extend({
  tagName: 'a',
  className: 'savePlaylistButton btn btn-lg btn-success',
  template,

  behaviors: {
    Button: {
      behaviorClass: Button
    }
  },

  installButton: null,

  initialize(options) {
    this.installButton = options.installButton;
    this.listenTo(App.extensionData, 'change:isUserLoaded', this._onExtensionDataChangeIsUserLoaded);
  },

  onClick() {
    // Prompt the user to install if needed and then automatically save the playlist.
    // This is better UX compared to makign the user click twice.
    if (this.installButton.get('enabled')) {
      this.model.set('saveOnInstallSuccess', true);
      // TODO: Button doesn't say 'Installing...'
      this.installButton.install();
    } else {
      this.model.save();
    }
  },

  _onExtensionDataChangeIsUserLoaded(extensionData, isUserLoaded) {
    // TODO: Could potentially be a long time to wait between install and user loaded.
    if (isUserLoaded && this.model.get('saveOnInstallSuccess')) {
      this.model.beginSaving();
      this.model.save();
    }
  }
});