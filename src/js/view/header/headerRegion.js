define(function(require) {
  'use strict';

  var HeaderView = require('view/header/headerView');

  var HeaderRegion = Marionette.Region.extend({
    initialize: function() {
      this.listenTo(Streamus.channels.body.vent, 'rendered', this._onBodyRendered);
    },

    _onBodyRendered: function() {
      this.show(new HeaderView());
    }
  });

  return HeaderRegion;
});
