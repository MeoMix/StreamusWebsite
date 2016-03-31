import { View } from 'marionette';
import template from './simpleMenuItem.hbs';
import styles from './simpleMenuItem.css';

export default View.extend({
  className: styles.simpleMenuItem,
  template,
  templateContext: {
    styles
  },

  events: {
    'click': '_onClick'
  },

  initialize() {
    this.el.classList.toggle(styles.isDisabled, this.model.get('disabled'));
  },

  onRender() {
    this._setState(this.model.get('active'));
  },

  _onClick() {
    const enabled = !this.model.get('disabled');

    if (enabled) {
      this.model.get('onClick')();

      this.triggerMethod('click:item', {
        view: this,
        model: this.model
      });
    }

    // Return false to prevent view from closing which emulates how native, disabled menu items work when clicked.
    return enabled;
  },

  _onChangeActive(model, active) {
    this._setState(active);
  },

  _setState(active) {
    this.el.classList.toggle(styles.isActive, active);
  }
});