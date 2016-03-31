import { View } from 'marionette';
import styles from './installButton.css';
import ViewEntityContainerBehavior from 'behavior/viewEntityContainerBehavior.js';

export default View.extend({
  tagName: 'a',
  className: styles.installButton,
  template: false,

  behaviors: {
    viewEntityContainer: {
      behaviorClass: ViewEntityContainerBehavior,
      viewEntityNames: ['model']
    }
  },

  events: {
    'click': '_onClick'
  },

  modelEvents: {
    'change:isDisabled': '_onChangeIsDisabled',
    'change:text': '_onChangeText'
  },

  initialize() {
    this._setIsDisabledClass(this.model.get('isDisabled'));
    this._setText(this.model.get('text'));
  },

  _onClick() {
    this.model.install();
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