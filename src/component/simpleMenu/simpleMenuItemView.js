import { LayoutView } from 'marionette';
import template from './simpleMenuItem.hbs';
import styles from './simpleMenuItem.css';
import FixedPosition from './fixedPosition.js';

export default LayoutView.extend({
  className: styles.simpleMenuItem,
  template,
  templateHelpers: {
    styles
  },

  events: {
    'click': '_onClick'
  },

  initialize() {
    this.el.classList.toggle(styles.isDisabled, this.model.get('disabled'));
    this._setFixedPositionClass(this.model.get('fixedPosition'));
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
  },

  // Add a border dividing a fixed ItemView's position from the other collection of ItemViews.
  _setFixedPositionClass(fixedPosition) {
    // TODO: css
    if (fixedPosition === FixedPosition.Top) {
      this.$el.addClass('u-bordered--bottom');
    } else if (fixedPosition === FixedPosition.Bottom) {
      this.$el.addClass('u-bordered--top');
    }
  }
});