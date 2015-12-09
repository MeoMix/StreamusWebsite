import { Region } from 'marionette';
import _ from 'lodash';

export default Region.extend({
  initialize(options) {
    this.listenTo(App.channels.content.commands, 'region:hideView', this._hideView);
    this.listenTo(App.channels.content.commands, `region:showView:${options.routeType}`, this._showView);
  },

  _hideView() {
    const currentView = this.currentView;

    if (!_.isUndefined(currentView)) {
      currentView.$el.addClass('is-hidden');
    }
  },

  _showView(View, viewOptions) {
    const currentView = this.currentView;

    // If there's no cached view then build one. Otherwise, update the view to instead of aggressively re-rendering.
    if (_.isUndefined(currentView)) {
      this.show(new View(viewOptions));
    } else {
      currentView.triggerMethod('update', viewOptions);
      currentView.$el.removeClass('is-hidden');
    }
  }
});