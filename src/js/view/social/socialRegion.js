define(function(require) {
  'use strict';

  var SocialView = require('view/social/socialView');

  var NavigationRegion = Marionette.Region.extend({
    initialize: function() {
      this.listenTo(Streamus.channels.body.vent, 'rendered', this._onBodyRendered);
    },

    _onBodyRendered: function() {
      this.show(new SocialView());
    }
  });

  return NavigationRegion;
});