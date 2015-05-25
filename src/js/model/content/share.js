define(function() {
  'use strict';

  var Share = Backbone.Model.extend({
    defaults: {
      shareCode: null
    },

    reset: function() {
      this.set(this.defaults);
    }
  });

  return Share;
});