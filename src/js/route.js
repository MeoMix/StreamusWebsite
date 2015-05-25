define(function(require) {
  'use strict';

  var RouteType = require('enum/routeType');

  var Route = Marionette.Object.extend({
    type: RouteType.NotFound,
    viewClass: null,

    show: function(routeData) {
      Streamus.channels.content.commands.trigger('region:hideView');

      var commandName = 'region:showView:' + this.type;
      var viewOptions = this.getViewOptions(routeData.params);
      Streamus.channels.content.commands.trigger(commandName, this.viewClass, viewOptions);
    },

    getViewOptions: _.noop,

    onError: function(error) {
      console.error(error);
    }
  });

  return Route;
});