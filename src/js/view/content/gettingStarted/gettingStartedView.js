define(function(require) {
  'use strict';

  var LazyImages = require('view/behavior/lazyImages');
  var GettingStartedTemplate = require('text!template/content/gettingStarted.html');

  var GettingStartedView = Marionette.LayoutView.extend({
    className: 'gettingStarted content',
    template: _.template(GettingStartedTemplate),

    behaviors: {
      LazyImages: {
        behaviorClass: LazyImages
      }
    }
  });

  return GettingStartedView;
});