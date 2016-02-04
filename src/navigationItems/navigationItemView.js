import { LayoutView } from 'marionette';
import template from './navigationItem.hbs!';
import styles from './navigationItem.css!';

export default LayoutView.extend({
  tagName: 'li',
  className: styles.navigationItem,
  template,
  templateHelpers: {
    styles
  },

  ui: {
    link: 'link'
  },

  modelEvents: {
    'change:isActive': '_onChangeIsActive'
  },

  initialize() {
    this.listenTo(App.channels.route.vent, 'shown', this._onRouteShown);
  },

  onRender() {
    const isActive = this.model.get('isActive');
    this._setIsActiveClass(isActive);
  },

  // Respond to routes showing to ensure that the proper navigation item is highlighted.
  _onRouteShown(routeType) {
    if (routeType === this.model.get('route')) {
      this.model.set('isActive', true);
    }
  },

  _onChangeIsActive(model, isActive) {
    this._setIsActiveClass(isActive);
  },

  _setIsActiveClass(isActive) {
    this.ui.link.toggleClass(styles.isActive, isActive);
  }
});