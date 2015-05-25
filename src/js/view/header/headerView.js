define(function(require) {
  'use strict';

  var LogoView = require('view/header/logoView');
  var NavigationView = require('view/header/navigationView');

  var HeaderView = Marionette.LayoutView.extend({
    el: '.header',
    template: false,

    regions: {
      logoRegion: '.logoRegion',
      navigationRegion: '.navigationRegion'
    },

    onRender: function() {
      this.logoRegion.show(new LogoView());
      this.navigationRegion.show(new NavigationView());
    }
  });

  return HeaderView;
});