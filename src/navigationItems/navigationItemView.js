import { LayoutView } from 'marionette';
import template from './navigationItem.hbs';
import styles from './navigationItem.css';

export default LayoutView.extend({
  tagName: 'li',
  className: styles.navigationItem,
  template,
  templateHelpers: {
    styles
  },

  modelEvents: {
    'change:isActive': '_onChangeIsActive'
  },

  initialize() {
    this._setActiveClass(this.model.get('isActive'));
    this.listenTo(App.channels.route.vent, 'shown', this._onRouteShown);
  },

  _onChangeIsActive(model, isActive) {
    this._setActiveClass(isActive);
  },

  // Respond to routes showing to ensure that the proper navigation item is highlighted.
  _onRouteShown(routeType) {
    this.model.set('isActive', routeType === this.model.get('route'));
  },

  _setActiveClass(isActive) {
    this.el.classList.toggle(styles.isActive, isActive);
  }
});