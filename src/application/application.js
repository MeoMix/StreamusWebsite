import 'common/shim/handlebars.helpers.shim';
import 'common/shim/backbone.marionette.region.shim';
import 'common/shim/backbone.marionette.toJson.shim';
import 'common/shim/backbone.marionette.view.shim';
import { Application } from 'marionette';
import { history } from 'backbone';
import Wreqr from 'backbone.wreqr';
import Intercept from 'backbone.intercept';
import Router from 'common/router';
import ApplicationView from './applicationView';
import ExtensionData from 'common/extensionData';
import AnalyticsManager from 'common/analyticsManager';
import Browser from 'common/browser';
//import 'zopim';
import 'bootstrap';

export default Application.extend({
  // Set this flag to true to enable localhost server & debugging flags.
  localDebug: false,
  router: null,
  extensionData: null,
  analyticsManager: null,
  browser: null,
  serverUrl: '',

  channels: {
    dialog: Wreqr.radio.channel('dialog'),
    body: Wreqr.radio.channel('body'),
    route: Wreqr.radio.channel('route'),
    content: Wreqr.radio.channel('content')
  },

  initialize() {
    this._setServerUrl();
    this.browser = new Browser();
    this.extensionData = new ExtensionData({
      browser: this.browser
    });
    this.analyticsManager = new AnalyticsManager();

    this.on('start', this._onStart);
  },

  _setServerUrl() {
    this.serverUrl = this.localDebug ? 'http://localhost:39853/' : 'https://aws-server.streamus.com/Streamus/';
  },

  _onStart() {
    const applicationView = new ApplicationView();
    applicationView.render();

    this.router = new Router();

    // Enable Backbone History to use routing. Only modern browsers are anticipated so set pushState to true.
    history.start({
      pushState: true
    });

    // Intercept href links so that HTML5 pushState is used instead of a full page reload.
    Intercept.start();

    this.analyticsManager.sendPageView();
  }
});