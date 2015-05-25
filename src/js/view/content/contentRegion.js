define(function() {
  'use strict';

  var ContentRegion = Marionette.Region.extend({
    initialize: function(options) {
      this.listenTo(Streamus.channels.content.commands, 'region:hideView', this._hideView);
      this.listenTo(Streamus.channels.content.commands, 'region:showView:' + options.routeType, this._showView);
    },

    _hideView: function() {
      var currentView = this.currentView;

      if (!_.isUndefined(currentView)) {
        currentView.$el.addClass('is-hidden');
      }
    },

    _showView: function(View, viewOptions) {
      var currentView = this.currentView;

      // If there's no cached view then build one. Otherwise, update the view to instead of aggressively re-rendering.
      if (_.isUndefined(currentView)) {
        this.show(new View(viewOptions));
      } else {
        currentView.triggerMethod('update', viewOptions);
        currentView.$el.removeClass('is-hidden');
      }
    }
  });

  return ContentRegion;
});