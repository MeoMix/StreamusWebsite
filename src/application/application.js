// Load globals before initialization the application to ensure all dependencies utilize the globals.
// Shim helpful/expected functionality into third-party libraries.
import 'common/shim/backbone.marionette.region.shim';
import 'common/shim/backbone.marionette.toJson.shim';
import 'common/shim/backbone.marionette.view.shim';
import 'common/shim/handlebars.helpers.shim';
import 'common/shim/lodash.mixin.shim';
import 'common/shim/webcomponents.shim';
// Load global CSS reset to standardize CSS across browsers.
import 'common/css/reset.css!';
// Load core CSS which isn't specific to a given module.
import 'common/css/core.css!';
import { Application } from 'marionette';
import { history } from 'backbone';
import Wreqr from 'backbone.wreqr';
import Intercept from 'backbone.intercept';
import Router from 'route/router';
import RouteType from 'route/routeType';
import ApplicationView from './applicationView';
import ExtensionData from 'common/extensionData';
import AnalyticsManager from 'common/analyticsManager';
import Browser from 'common/browser';
import NavigationItems from 'navigationItems/navigationItems';

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
    // TODO: CSS is being appended at runtime during development. Wait for CSS be parsed.
    setTimeout(() => {
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
    }, 100);
  }
});