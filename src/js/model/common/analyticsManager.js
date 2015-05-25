define(function(require) {
  'use strict';

  var AnalyticsManager = Backbone.Model.extend({
    defaults: {
      module: null
    },

    // More information regarding UA: https://developers.google.com/analytics/devguides/collection/analyticsjs/
    initialize: function() {
      // Setup temporary Google Analytics objects.
      window.GoogleAnalyticsObject = 'ga';
      // Assign to ga because if ad-blocking software prevents google-analytics from running then 'ga' won't be injected
      // and the entire page will fail to load due to lack of ga.
      window.ga = function() {
        (window.ga.q = window.ga.q || []).push(arguments);
      };
      window.ga.l = 1 * new Date();

      window.ga('create', 'UA-41808530-1', 'auto');
      window.ga('require', 'displayfeatures');
      window.ga('require', 'linkid', 'linkid.js');

      // Create a function that wraps `window.ga`.
      // This allows dependant modules to use `window.ga` without knowingly
      // programming against a global object.
      this.set('module', function() {
        window.ga.apply(this, arguments);
      });

      // Asynchronously load Google Analytics, letting it take over our `window.ga`
      // object after it loads. This allows us to add events to `window.ga` even
      // before the library has fully loaded.
      require(['//www.google-analytics.com/analytics.js']);
    },

    sendPageView: function(url) {
      if (_.isUndefined(url)) {
        this.get('module')('send', 'pageview');
      } else {
        this.get('module')('send', 'pageview', url);
      }
    },

    trackEvent: function(category, action, label) {
      this.get('module')('send', 'event', category, action, label);
    }
  });

  return AnalyticsManager;
});