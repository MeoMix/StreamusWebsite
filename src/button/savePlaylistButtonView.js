import { LayoutView } from 'marionette';
import template from './savePlaylistButton.hbs!';
import styles from './savePlaylistButton.css!';
import Button from 'behavior/button';

export default LayoutView.extend({
  tagName: 'a',
  className: styles.savePlaylistButton,
  template,
  templateHelpers: {
    styles
  },

  behaviors: {
    Button: {
      behaviorClass: Button
    }
  },

  installButton: null,

  initialize(options) {
    this.installButton = options.installButton;
  },

  onClick() {
    // Prompt the user to install if needed and then automatically save the playlist.
    // This is better UX compared to making the user click twice.
    if (this.installButton.get('isEnabled')) {
      this.model.set('isSavePending', true);
      // TODO: Button doesn't say 'Installing...'
      this.installButton.install();
    } else {
      this.model.save();
    }
  }
});