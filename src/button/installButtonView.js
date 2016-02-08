import { LayoutView } from 'marionette';
import styles from './installButton.css';
import ViewEntityContainer from 'behavior/viewEntityContainer.js';

export default LayoutView.extend({
  tagName: 'a',
  className: styles.installButton,
  template: false,

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

  initialize() {
    this._setIsDisabledClass(this.model.get('isDisabled'));
    this._setText(this.model.get('text'));
  },

  onClick() {
    if (!this.model.get('isDisabled')) {
      this.model.install();
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