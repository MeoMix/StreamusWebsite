import { LayoutView } from 'marionette';
import template from './navigationItem.hbs!';

export default LayoutView.extend({
  tagName: 'li',
  template,

  modelEvents: {
    'change:active': '_onChangeActive'
  },

  initialize() {
    this.listenTo(App.channels.route.vent, 'shown', this._onRouteShown);
  },

  onRender() {
    const active = this.model.get('active');
    this._setActiveClass(active);
  },

  // Respond to routes showing to ensure that the proper navigation item is highlighted.
  _onRouteShown(routeType) {
    if (routeType === this.model.get('route')) {
      this.model.set('active', true);
    }
  },

  _onChangeActive(model, active) {
    this._setActiveClass(active);
  },

  _setActiveClass(active) {
    this.$el.toggleClass('active', active);
  }
});