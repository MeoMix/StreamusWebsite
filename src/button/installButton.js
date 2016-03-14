import { Model, history } from 'backbone';
import RouteType from 'route/routeType.js';
import { result } from 'lodash';

export default Model.extend({
  defaults: {
    isDisabled: false,
    isInstalling: false,
    // TODO: Feel like text shouldn't be in the model.
    text: 'Install'
  },

  initialize() {
    this._ensureValidBrowser();

    if (App.extensionData.get('isInstalled')) {
      this._markInstalled();
    }

    this.listenTo(App.extensionData, 'change:isInstalled', this._onExtensionDataChangeIsInstalled);
  },

  install() {
    this.set('isInstalling', true);

    App.channels.snackbar.commands.trigger('show:snackbar', {
      message: 'Installing Streamus.'
    });

    const { installer, installTarget } = this._getInstallData();
    installer(installTarget, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
  },

  reset() {
    this.set(result(this, 'defaults'));
  },

  _onExtensionDataChangeIsInstalled(extensionData, isInstalled) {
    if (isInstalled) {
      this._markInstalled();
    } else {
      this.reset();
    }
  },

  _onInstallSuccess() {
    // TODO: I feel like only one of these is needed.
    this._markInstalled();
    App.extensionData.set('isInstalled', true);

    // TODO: Model shouldn't know about the router.
    // Take the user to the GettingStarted page if they're on Home when installing.
    // This forced navigation will take them to instructions on how to use the program.
    // In other parts of the website, it's bad UX to force them away from what they were reading.
    if (history.fragment === RouteType.Home) {
      App.router.navigate(RouteType.GettingStarted, {
        trigger: true
      });
    }

    App.analyticsManager.trackEvent('Extension', 'InstallSuccess');
  },

  _onInstallError(error) {
    this.reset();

    if (error !== 'User cancelled install') {
      App.channels.snackbar.commands.trigger('show:snackbar', {
        message: `${error}.`
      });
      App.analyticsManager.trackEvent('Extension', 'InstallError', error);
    }
  },

  _markInstalled() {
    this.set({
      isDisabled: true,
      isInstalling: false,
      text: 'Installed'
    });
  },

  _getInstallData() {
    let installTarget;
    let installer;

    if (App.browser.get('isOpera')) {
      installTarget = App.extensionData.get('operaId');
      installer = window.opr.addons.installExtension;
    } else {
      installTarget = `https://chrome.google.com/webstore/detail/${App.extensionData.get('chromeId')}`;
      installer = window.chrome.webstore.install;
    }

    return {
      installTarget,
      installer
    };
  },

  _ensureValidBrowser() {
    const browser = App.browser;

    // Can't install Streamus on mobile browsers.
    if (browser.get('isMobile')) {
      this.set({
        enabled: false,
        text: 'Desktop required'
      });
    } else {
      // Can't install Streamus on non-webkit browsers nor non-current webkit browsers.
      const minOperaVersion = 24;
      const minChromeVersion = 37;
      const isWebKit = browser.get('isWebKit');
      const isInvalidOperaVersion = browser.get('isOpera') && browser.get('version') < minOperaVersion;
      const isInvalidChromeVersion = browser.get('isChrome') && browser.get('version') < minChromeVersion;

      if (!isWebKit || isInvalidOperaVersion || isInvalidChromeVersion) {
        this.set({
          enabled: false,
          text: `Chrome v${minChromeVersion} or Opera v${minOperaVersion} required`
        });
      }
    }
  }
});