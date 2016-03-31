// Load globals before initialization the application to ensure all dependencies utilize the globals.
// Shim helpful/expected functionality into third-party libraries.
import 'common/shim/marionette.view.shim.js';
import 'common/shim/handlebars.helpers.shim.js';
import 'common/shim/lodash.mixin.shim.js';
import 'common/shim/webcomponents.shim.js';
// Load core CSS which isn't specific to a given module.
import 'common/css/core.css';
import { Application } from 'marionette';
import { history } from 'backbone';
import Radio from 'backbone.radio';
import Intercept from 'backbone.intercept';
import Router from 'route/router.js';
import ApplicationView from './applicationView.js';
import Extension from 'common/extension.js';
import AnalyticsManager from 'common/analyticsManager.js';
import NavigationItems from 'navigationItems/navigationItems.js';

export default Application.extend({
  router: null,
  extension: null,
  analyticsManager: null,
  browser: null,
  serverUrl: 'https://aws-server.streamus.com/Streamus/',

  channels: {
    body: Radio.channel('body'),
    route: Radio.channel('route'),
    content: Radio.channel('content'),
    element: Radio.channel('element'),
    snackbar: Radio.channel('snackbar'),
    window: Radio.channel('window')
  },

  initialize() {
    this.extension = new Extension();
    this.analyticsManager = new AnalyticsManager();
    this.router = new Router();
    this.navigationItems = new NavigationItems();
    this.navigationItems.loadDefaults();

    this.on('start', this._onStart);
  },

  _onStart() {
    const applicationView = new ApplicationView();
    applicationView.render();

    // Enable Backbone History to use routing. Only modern browsers are anticipated so set pushState to true.
    history.start({ pushState: true });

    // Intercept href links so that HTML5 pushState is used instead of a full page reload.
    Intercept.start();

    this.analyticsManager.sendPageView();
  }
});