define(function() {
  'use strict';

  var Updatable = Marionette.Behavior.extend({
    onUpdate: function(options) {
      var attributes = options ? options.model.attributes : this.view.model.defaults;
      this.view.model.set(attributes);
    }
  });

  return Updatable;
});