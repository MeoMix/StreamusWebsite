import { LayoutView } from 'marionette';
import styles from './savePlaylistButton.css';
import ViewEntityContainer from 'behavior/viewEntityContainer.js';

export default LayoutView.extend({
  tagName: 'a',
  className: styles.savePlaylistButton,
  template: false,
  templateHelpers: {
    styles
  },

  behaviors: {
    ViewEntityContainer: {
      behaviorClass: ViewEntityContainer,
      viewEntityNames: ['model']
    }
  },

  modelEvents: {
    'change:isDisabled': '_onChangeIsDisabled',
    'change:text': '_onChangeText'
  },

  installButton: null,

  initialize(options) {
    this.installButton = options.installButton;

    this._setIsDisabledClass(this.model.get('isDisabled'));
    this._setText(this.model.get('text'));
  },

  onClick() {
    // Prompt the user to install if needed and then automatically save the playlist.
    // This is better UX compared to making the user click twice.
    if (!this.installButton.get('isDisabled')) {
      this.model.set('isSavePending', true);
      // TODO: Button doesn't say 'Installing...'
      this.installButton.install();
    } else if (!this.model.get('isDisabled')) {
      this.model.save();
    }
  },

  _onChangeIsDisabled(model, isDisabled) {
    this._setIsDisabledClass(isDisabled);
  },

  _onChangeText(model, text) {
    this._setText(text);
  },

  _setIsDisabledClass(isDisabled) {
    this.el.classList.toggle(styles.isDisabled, isDisabled);
  },

  _setText(text) {
    this.el.textContent = text;
  }
});