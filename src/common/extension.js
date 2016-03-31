import { Model, history } from 'backbone';
import browser from 'jquery.browser';
import RouteType from 'route/routeType.js';

export default Model.extend({
  defaults: {
    id: null,
    chromeId: 'jbnkffmindojffecdhbbmekbmkkfpmjd',
    operaId: 'nnmcpagedcgekmljdamaeahfbmmjloho',
    isInstalled: false,
    isUserLoaded: false,
    canInstall: true,
    cantInstallReason: '',
    pollAttemptCount: 0,
    maxPollAttemptCount: 10,
    // How often to poll the extension in ms
    pollInterval: 500
  },

  initialize() {
    this.on('change:isInstalled', this._onChangeIsInstalled);

    this._setCanInstall();

    this.set('id', this._getExtensionId());
    this._setIsInstalled();
  },

  install() {
    App.channels.snackbar.trigger('show:snackbar', {
      message: 'Installing Streamus.'
    });

    const { installer, installTarget } = this._getInstallData();

    return new Promise((resolve, reject) => {
      installer(installTarget, () => {
        this._onInstallSuccess();
        resolve();
      }, (error) => {
        this._onInstallError(error);
        reject(error);
      });
    });
  },

  sendMessage(data) {
    return new Promise((resolve, reject) => {
      window.chrome.runtime.sendMessage(this.get('id'), data, (response) => {
        if (response.result === 'success') {
          resolve();
        } else {
          reject();
        }
      });
    });
  },

  _onChangeIsInstalled(model, isInstalled) {
    this._setCanInstall();

    if (isInstalled) {
      if (this.get('pollAttemptCount') === 0) {
        this._pollForUserLoaded();
      }
    } else {
      this.set('isUserLoaded', false);
    }
  },

  _onInstallSuccess() {
    this.set('isInstalled', true);

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
    if (error !== 'User cancelled install') {
      App.channels.snackbar.trigger('show:snackbar', {
        message: `${error}.`
      });
      App.analyticsManager.trackEvent('Extension', 'InstallError', error);
    }
  },

  _getInstallData() {
    let installTarget;
    let installer;

    if (browser.opr) {
      installTarget = this.get('operaId');
      installer = window.opr.addons.installExtension;
    } else {
      installTarget = `https://chrome.google.com/webstore/detail/${this.get('chromeId')}`;
      installer = window.chrome.webstore.install;
    }

    return {
      installTarget,
      installer
    };
  },

  // It's not possible to have the extension notify the website of when the user is successfully loaded
  // without adding additional permissions. So, long poll the extension until it indicates that the user is ready.
  _pollForUserLoaded() {
    const pollAttemptCount = this.get('pollAttemptCount');

    if (pollAttemptCount < this.get('maxPollAttemptCount')) {
      this.set('pollAttemptCount', pollAttemptCount + 1);

      window.chrome.runtime.sendMessage(this.get('id'), {
        method: 'isUserLoaded'
      }, (response) => {
        if (response && response.isUserLoaded) {
          this.set('isUserLoaded', true);
          this.set('pollAttemptCount', 0);
        } else {
          setTimeout(() => this._pollForUserLoaded(), 500);
        }
      });
    } else {
      this.set('pollAttemptCount', 0);
    }
  },

  _getExtensionId() {
    let extensionId = null;

    if (!browser.mobile) {
      if (browser.chrome) {
        extensionId = this.get('chromeId');
      } else if (browser.opr) {
        extensionId = this.get('operaId');
      }
    }

    return extensionId;
  },

  // Attempt to ping Streamus Chrome Extension. If a response is received then it is known to be installed.
  _setIsInstalled() {
    const extensionId = this.get('id');

    if (extensionId !== null) {
      // Opera doesn't have chrome.runtime defined until an extension is installed.
      if (window.chrome.runtime) {
        window.chrome.runtime.sendMessage(extensionId, {
          message: 'isInstalled'
        }, (response) => {
          this.set('isInstalled', response && response.isInstalled);
        });
      } else {
        this.set('isInstalled', false);
      }
    }
  },

  _setCanInstall() {
    if (this.get('isInstalled')) {
      this.set({
        canInstall: false,
        cantInstallReason: 'Installed'
      });
    }

    if (browser.mobile) {
      this.set({
        canInstall: false,
        cantInstallReason: 'Desktop required'
      });
    } else {
      // Can't install Streamus on non-webkit browsers nor non-current webkit browsers.
      const minOperaVersion = 24;
      const minChromeVersion = 37;
      const isWebKit = browser.opr || browser.chrome;
      const isInvalidOperaVersion = browser.opr && browser.version < minOperaVersion;
      const isInvalidChromeVersion = browser.chrome && browser.version < minChromeVersion;

      // TODO: Either drop Opera support fully, or update msgs.
      if (!isWebKit) {
        this.set({
          canInstall: false,
          cantInstallReason: 'Google Chrome required'
        });
      } else if (isInvalidOperaVersion || isInvalidChromeVersion) {
        this.set({
          canInstall: false,
          cantInstallReason: `Google Chrome v${minChromeVersion} required`
        });
      }
    }
  }
});