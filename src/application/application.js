// Load globals before initialization the application to ensure all dependencies utilize the globals.
// Shim helpful/expected functionality into third-party libraries.
import 'common/shim/marionette.region.shim.js';
import 'common/shim/marionette.toJson.shim.js';
import 'common/shim/marionette.view.shim.js';
import 'common/shim/handlebars.helpers.shim.js';
import 'common/shim/lodash.mixin.shim.js';
import 'common/shim/webcomponents.shim.js';
// Load global CSS reset to standardize CSS across browsers.
import 'common/css/reset.css';
// Load core CSS which isn't specific to a given module.
import 'common/css/core.css';
import { Application } from 'marionette';
import { history } from 'backbone';
import Wreqr from 'backbone.wreqr';
import Intercept from 'backbone.intercept';
import Router from 'route/router.js';
import RouteType from 'route/routeType.js';
import ApplicationView from './applicationView.js';
import ExtensionData from 'common/extensionData.js';
import AnalyticsManager from 'common/analyticsManager.js';
import Browser from 'common/browser.js';
import NavigationItems from 'navigationItems/navigationItems.js';

export default Application.extend({
  router: null,
  extensionData: null,
  analyticsManager: null,
  browser: null,
  serverUrl: 'https://aws-server.streamus.com/Streamus/',

  channels: {
    body: Wreqr.radio.channel('body'),
    route: Wreqr.radio.channel('route'),
    content: Wreqr.radio.channel('content'),
    element: Wreqr.radio.channel('element'),
    notification: Wreqr.radio.channel('notification'),
    window: Wreqr.radio.channel('window'),
    simpleMenu: Wreqr.radio.channel('simpleMenu')
  },

  initialize() {
    this.browser = new Browser();
    this.extensionData = new ExtensionData({
      browser: this.browser
    });
    this.analyticsManager = new AnalyticsManager();
    this.navigationItems = new NavigationItems([{
      text: 'Home',
      route: RouteType.Home
    }, {
      text: 'Getting Started',
      route: RouteType.GettingStarted
    }, {
      text: 'FAQ',
      route: RouteType.Faq
    }, {
      text: 'Share',
      route: RouteType.Share
    }, {
      text: 'About',
      route: RouteType.About
    }, {
      text: 'Donate',
      route: RouteType.Donate
    }, {
      text: 'Contact',
      route: RouteType.Contact,
      isSecondary: true
    }, {
      text: 'Terms of Use',
      route: RouteType.TermsOfUse,
      isSecondary: true
    }, {
      text: 'Privacy Policy',
      route: RouteType.PrivacyPolicy,
      isSecondary: true
    }]);

    this.on('start', this._onStart);
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