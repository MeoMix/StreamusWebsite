define(function(require) {
  'use strict';

  var Router = require('router');
  var BodyView = require('view/bodyView');
  var ExtensionData = require('model/common/extensionData');
  var AnalyticsManager = require('model/common/analyticsManager');
  var Browser = require('model/common/browser');

  var Application = Marionette.Application.extend({
    // Set this flag to true to enable localhost server & debugging flags.
    localDebug: false,
    router: null,
    extensionData: null,
    analyticsManager: null,
    browser: null,
    serverUrl: '',

    channels: {
      dialog: Backbone.Wreqr.radio.channel('dialog'),
      body: Backbone.Wreqr.radio.channel('body'),
      route: Backbone.Wreqr.radio.channel('route'),
      content: Backbone.Wreqr.radio.channel('content')
    },

    initialize: function() {
      this._setServerUrl();
      this.browser = new Browser();
      this.extensionData = new ExtensionData({
        browser: this.browser
      });
      this.analyticsManager = new AnalyticsManager();

      this.on('start', this._onStart);
    },

    _setServerUrl: function() {
      this.serverUrl = this.localDebug ? 'http://localhost:39853/' : 'https://aws-server.streamus.com/Streamus/';
    },

    _onStart: function() {
      var bodyView = new BodyView();
      bodyView.render();

      this.router = new Router();

      // Enable Backbone History to use routing. Only modern browsers are anticipated so set pushState to true.
      Backbone.history.start({
        pushState: true
      });

      // Intercept href links so that HTML5 pushState is used instead of a full page reload.
      Backbone.Intercept.start();

      this.analyticsManager.sendPageView();
    }
  });

  window.Streamus = new Application();
  Streamus.start();
});