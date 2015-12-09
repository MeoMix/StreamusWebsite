import { Model, history } from 'backbone';
import RouteType from 'common/enum/routeType';

export default Model.extend({
  defaults: {
    enabled: true,
    text: 'Install extension now',
    minimumChromeVersion: 37,
    minimumOperaVersion: 24
  },

  initialize() {
    this._ensureValidBrowser();
    this.setInstalledState(App.extensionData.get('installed'));
  },

  install() {
    this.set({
      enabled: false,
      text: 'Installing...'
    });

    let installTarget;
    let installer;

    if (App.browser.get('isOpera')) {
      installTarget = App.extensionData.get('operaId');
      installer = window.opr.addons.installExtension;
    } else {
      installTarget = `https://chrome.google.com/webstore/detail/${App.extensionData.get('chromeId')}`;
      installer = window.chrome.webstore.install;
    }

    installer(installTarget, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
  },

  reset() {
    this.set(this.defaults);
  },

  setInstalledState(extensionInstalled) {
    if (extensionInstalled) {
      this.set({
        enabled: false,
        text: 'Installed'
      });
    }
  },

  _onInstallSuccess() {
    this.set('text', 'Installed');
    App.extensionData.markAsInstalled();

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
    if (error === 'User cancelled install') {
      this.reset();
    } else {
      this.set({
        text: `Error: ${error}`
      });
      App.analyticsManager.trackEvent('Extension', 'InstallError', error);
    }
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
      const minimumOperaVersion = this.get('minimumOperaVersion');
      const minimumChromeVersion = this.get('minimumChromeVersion');
      const isWebKit = browser.get('isWebKit');
      const isInvalidOperaVersion = browser.get('isOpera') && browser.get('version') < minimumOperaVersion;
      const isInvalidChromeVersion = browser.get('isChrome') && browser.get('version') < minimumChromeVersion;

      if (!isWebKit || isInvalidOperaVersion || isInvalidChromeVersion) {
        this.set({
          enabled: false,
          text: `Chrome v${minimumChromeVersion} or Opera v${minimumOperaVersion} required`
        });
      }
    }
  }
});