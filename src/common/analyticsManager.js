import { Model } from 'backbone';
import _ from 'lodash';
// Polyfill is needed for Reflect API
import 'babel/polyfill';

export default Model.extend({
  defaults: {
    module: null
  },

  // More information regarding UA: https://developers.google.com/analytics/devguides/collection/analyticsjs/
  initialize() {
    // Setup temporary Google Analytics objects.
    window.GoogleAnalyticsObject = 'ga';
    // Assign to ga because if ad-blocking software prevents google-analytics from running then 'ga' won't be injected
    // and the entire page will fail to load due to lack of ga.
    /*eslint-disable id-length*/
    window.ga = function() {
      (window.ga.q = window.ga.q || []).push(arguments);
    };
    window.ga.l = Number(new Date());
    /*eslint-enable id-length*/

    window.ga('create', 'UA-41808530-1', 'auto');
    window.ga('require', 'displayfeatures');
    window.ga('require', 'linkid', 'linkid.js');

    // Create a function that wraps `window.ga`.
    // This allows dependant modules to use `window.ga` without knowingly
    // programming against a global object.
    this.set('module', () => {
      Reflect.apply(window.ga, this, arguments);
    });
  },

  sendPageView(url) {
    if (_.isUndefined(url)) {
      this.get('module')('send', 'pageview');
    } else {
      this.get('module')('send', 'pageview', url);
    }
  },

  trackEvent(category, action, label) {
    this.get('module')('send', 'event', category, action, label);
  }
});