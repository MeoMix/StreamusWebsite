define(function(require) {
  'use strict';

  var NavigationItem = require('model/header/navigationItem');

  var NavigationItems = Backbone.Collection.extend({
    model: NavigationItem,

    initialize: function() {
      this.on('change:active', this._onChangeActive);
    },

    _onChangeActive: function(model, active) {
      if (active) {
        this._deactiveAllExcept(model);
      }
    },

    // Ensure only one model in the collection can be active at a time.
    _deactiveAllExcept: function(activeModel) {
      this.each(function(model) {
        if (model !== activeModel) {
          model.set('active', false);
        }
      });
    }
  });

  return NavigationItems;
});